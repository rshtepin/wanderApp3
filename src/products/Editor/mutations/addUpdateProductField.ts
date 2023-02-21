import { resolver, usePaginatedQuery } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'
import { IProductFields } from 'src/types'

const updateProductField = z.object({
  id: z.number(),
  title: z.string(),
  id_group: z.number(),
  unit: z.string().optional(),
  order: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(updateProductField),
  // resolver.authorizeid
  async ({ id, title, order, id_group, unit }) => {
    const count = await db.product_variable.count({ where: { id_group: id_group } })
    const field: IProductFields = await db.product_variable.upsert({
      where: { id: id },
      update: { title: title, order: order, id_group: id_group, unit: unit },
      create: { title: title, order: count + 1, id_group: id_group, unit: unit },
    })
    if (!field) throw new NotFoundError()
    return field
  }
)
