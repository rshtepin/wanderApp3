import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const GetProduct = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  resolver.zod(GetProduct),
  // resolver.authorize(),
  async ({ id }) => {
    const product = await db.product.findUnique({
      where: { id: 1 },
      include: { Variable_value: { include: { variable: true } } },
    })

    console.log(JSON.parse(JSON.stringify(product.Variable_value)))

    if (!product) throw new NotFoundError()

    return product
  }
)
