import { NotFoundError } from 'blitz'
import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'

const GetTesting = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(resolver.zod(GetTesting), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const testing = await db.testing.findFirst({ where: { id } })

  if (!testing) throw new NotFoundError()

  return testing
})
