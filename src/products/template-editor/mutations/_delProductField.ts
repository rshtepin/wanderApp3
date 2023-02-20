import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const deleteProductField = z.object({
  id: z.number(),
})

const reIdvarNames = async () => {
  const fields = await db.product_variable.findMany({ orderBy: [{ order: 'asc' }] })
  fields.map(async (item, index) => {
    if (index + 1 != item.order) {
      const field = await db.product_variable.update({
        where: { id: item.id },
        data: { order: index + 1 },
      })
    }
  })
}

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
  },
  async () => reIdvarNames()
)
