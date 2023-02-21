import { resolver, usePaginatedQuery } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const updateProductType = z.object({
  id: z.number(),
  title: z.string(),
  order: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(updateProductType),
  // resolver.authorize(),
  async ({ id, title, order }) => {
    const count = await db.productType.count()
    const type = await db.productType.upsert({
      where: { id },
      update: { order: order, title: title },
      create: { title: title, order: count + 1 },
    })
    if (!type) throw new NotFoundError()
    return type
  }
)
