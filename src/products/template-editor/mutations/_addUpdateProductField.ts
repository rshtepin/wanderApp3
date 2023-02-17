import { resolver, usePaginatedQuery } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const updateProductField = z.object({
  variable: z.string(),
  name: z.string(),
  oldVar: z.string(),
  id_group: z.number().optional(),
  order: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(updateProductField),
  // resolver.authorize(),
  async ({ variable, name, oldVar, order, id_group }) => {
    const count = await db.product_variable.count()
    const field = await db.product_variable.upsert({
      where: { var: oldVar },
      update: { var: variable, name: name, order: order, id_group: id_group },
      create: { var: variable, name: name, order: count + 1 },
    })
    if (!field) throw new NotFoundError()
    return field
  }
)
