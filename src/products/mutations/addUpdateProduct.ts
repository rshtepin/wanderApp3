import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const addUpdateProduct = z.object({
  title: z.string().optional(),
  logo: z.string().optional(),
  longdesc: z.string().optional(),
  shortdesc: z.string().optional(),
  type: z.string()?.optional(),
  id: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(addUpdateProduct),
  // resolver.authorize(),
  async ({ title, logo, longdesc, shortdesc, type, id }) => {
    const product = await db.product.upsert({
      where: { id: id },
      update: { title: title, logo: logo, longdesc: longdesc, shortdesc: shortdesc },
      create: { title: title, type: type },
    })

    if (!product) throw new NotFoundError()
    return product
  }
)
