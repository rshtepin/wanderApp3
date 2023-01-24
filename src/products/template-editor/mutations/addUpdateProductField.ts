import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const updateProductField = z.object({
  variable: z.string(),
  name: z.string(),
  oldVar: z.string(),
})

export default resolver.pipe(
  resolver.zod(updateProductField),
  // resolver.authorize(),
  async ({ variable, name, oldVar }) => {
    const field = await db.product_variable.upsert({
      where: { var: oldVar },
      update: { var: variable, name: name },
      create: { var: variable, name: name },
    })

    if (!field) throw new NotFoundError()

    return field
  }
)
