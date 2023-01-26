import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const updateProductField = z.object({
  field: z.string(),
  id: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(addUpdateProduct),
  // resolver.authorize(),
  async ({ title, id }) => {
    const product = await db.product.upsert({
      where: { id: id },
      update: { title: title },
      create: { title: title },
    })

    if (!product) throw new NotFoundError()

    return product
  }
)
