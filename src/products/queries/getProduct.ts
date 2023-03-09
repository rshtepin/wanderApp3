import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'
import { IProduct } from 'src/types'

const GetProduct = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetProduct),
  // resolver.authorize(),
  async ({ id }) => {
    const product = await db.product.findUnique!({
      where: { id: id },
      include: { Variable_value: { include: { variable: true } } },
    })
    if (!product) throw new NotFoundError()

    return product
  }
)
