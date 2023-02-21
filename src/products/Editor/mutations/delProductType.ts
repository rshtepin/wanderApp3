import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const deleteProductType = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(deleteProductType),
  // resolver.authorize(),
  async ({ id }) => {
    const type = await db.productType.delete({
      where: {
        id: id,
      },
    })

    if (!type) throw new NotFoundError()
    return type
  }
)
