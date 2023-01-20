import { resolver } from '@blitzjs/rpc'
import db, { Prisma } from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const GetUser = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(GetUser),
  // resolver.authorize(),
  async ({ id }) => {
    const user = await db.user.findFirst({ where: { id } })

    if (!user) throw new NotFoundError()

    return user
  }
)
