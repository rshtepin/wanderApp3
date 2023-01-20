import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'

const UpdateTesting = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateTesting),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const testing = await db.testing.update({ where: { id }, data })

    return testing
  }
)
