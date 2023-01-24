import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const deleteProductField = z.object({
  variable: z.string(),
})

const reIdvarNames = async () => {
  console.log('ПРОБУЕМ')
  const fields = await db.product_variable.findMany({ orderBy: [{ order: 'asc' }] })
  console.log('FIELDS:  ' + fields)
  fields.map(async (item, index) => {
    if (index + 1 != item.order) {
      console.log('index = ' + index + ' item.id = ' + item.order)
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
  async ({ variable }) => {
    const field = await db.product_variable.delete({
      where: {
        var: variable,
      },
    })

    if (!field) throw new NotFoundError()
    return field
  },
  async () => reIdvarNames()
)
