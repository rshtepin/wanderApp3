import { resolver, usePaginatedQuery } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const updateProductGroupField = z.object({
  variable: z.string(),
  name: z.string(),
  oldVar: z.string(),
  order: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(updateProductGroupField),
  // resolver.authorize(),
  async ({ variable, name, oldVar, order }) => {
    const count = await db.field_group.count()
    const field = await db.field_group.upsert({
      where: { var: oldVar },
      update: { var: variable, name: name, order: order },
      create: { var: variable, name: name, order: count + 1 },
    })
    if (!field) throw new NotFoundError()
    return field
  }
)
