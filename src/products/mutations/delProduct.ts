import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const deleteProduct = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(deleteProduct),
  // resolver.authorize(),
  async ({ id }) => {
    const product = await db.product.delete({
      where: {
        id: id,
      },
    })

    if (!product) throw new NotFoundError()
    return product
  }
)
