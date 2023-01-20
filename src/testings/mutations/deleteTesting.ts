import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'

const DeleteTesting = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteTesting), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const testing = await db.testing.deleteMany({ where: { id } })

  return testing
})
