import { resolver, usePaginatedQuery } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const addUpdateFieldValue = z.object({
  id_product: z.number(),
  id_variable: z.number(),
  value: z.string(),
})

export default resolver.pipe(
  resolver.zod(addUpdateFieldValue),
  // resolver.authorize(),
  async ({ id_product, id_variable, value }) => {
    const field = await db.variable_value.upsert({
      where: { id_product_id_variable: { id_product, id_variable } },
      update: { id_product: id_product, id_variable: id_variable, value: value },
      create: { id_product: id_product, id_variable: id_variable, value: value },
    })
    if (!field) throw new NotFoundError()
    return field
  }
)
