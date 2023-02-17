import { resolver } from '@blitzjs/rpc'
import db, { Prisma, ProductType } from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const ProductTypeByTitle = z.object({
  typeId: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(
  // resolver.authorize(),
  resolver.zod(ProductTypeByTitle),
  async ({ typeId }) => {
    const groups = await db.field_group.findMany({
      where: { typeId: typeId },
    })

    console.log('productType')
    console.log(groups)
    if (!groups) throw new NotFoundError()
    return groups
  }
)
