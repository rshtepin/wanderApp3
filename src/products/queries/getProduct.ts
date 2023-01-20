import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const GetProduct = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(GetProduct),
  // resolver.authorize(),
  async ({ id }) => {
    const product = await db.products.findFirst({ where: { id } })

    if (!product) throw new NotFoundError()

    return product
  }
)
