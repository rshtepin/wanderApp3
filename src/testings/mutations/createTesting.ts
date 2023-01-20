import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'

const CreateTesting = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTesting), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const testing = await db.testing.create({ data: input })

  return testing
})
