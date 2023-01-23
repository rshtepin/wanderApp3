import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const updateProductField = z.object({
  variable: z.string(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(updateProductField),
  // resolver.authorize(),
  async ({ variable, name }) => {
    console.log('ALLLLLO  ' + variable + ' ' + name)
    const field = await db.product_variables.upsert({
      where: { var: variable },
      update: { name: name },
      create: { var: variable, name: name },
    })

    if (!field) throw new NotFoundError()

    return field
  }
)
