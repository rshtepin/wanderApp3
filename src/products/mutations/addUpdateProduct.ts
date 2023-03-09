import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const addUpdateProduct = z.object({
  title: z.string().optional(),
  logo: z.string().optional(),
  longdesc: z.string().optional(),
  shortdesc: z.string().optional(),
  typeId: z.number(),
  id: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(addUpdateProduct),
  // resolver.authorize(),
  async ({ title, logo, longdesc, shortdesc, typeId, id }) => {
    const product = await db.product.upsert({
      where: { id: id },
      update: {
        title: title,
        logo: logo,
        longdesc: longdesc,
        shortdesc: shortdesc,
        typeId: typeId,
      },
      create: { title: title!, typeId: typeId },
    })

    if (!product) throw new NotFoundError()
    return product
  }
)
