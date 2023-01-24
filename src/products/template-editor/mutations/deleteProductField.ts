import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const deleteProductField = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(deleteProductField),
  // resolver.authorize(),
  async ({ id }) => {
    const field = await db.product_variable.delete({
      where: {
        var: id,
      },
    })

    if (!field) throw new NotFoundError()
    return field
  }
)
