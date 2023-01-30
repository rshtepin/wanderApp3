import { resolver, usePaginatedQuery } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const updateProductField = z.object({
  variable: z.string(),
  name: z.string(),
  oldVar: z.string(),
  order: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(updateProductField),
  // resolver.authorize(),
  async ({ variable, name, oldVar, order }) => {
    const count = await db.product_variable.count()
    const field = await db.product_variable.upsert({
      where: { var: oldVar },
      update: { var: variable, name: name, order: order },
      create: { var: variable, name: name, order: count + 1 },
    })
    if (!field) throw new NotFoundError()
    return field
  }
)
