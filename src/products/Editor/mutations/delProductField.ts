import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const deleteProductField = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(deleteProductField),
  // resolver.authorize(),
  async ({ id }) => {
    console.log('Имя: ' + id)
    const field = await db.product_variable.delete({
      where: {
        id: id,
      },
    })

    if (!field) throw new NotFoundError()
    return field
  }
)
