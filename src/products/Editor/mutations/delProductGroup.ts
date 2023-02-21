import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const deleteProductGroup = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(deleteProductGroup),
  // resolver.authorize(),
  async ({ id }) => {
    const group = await db.field_group.delete({
      where: {
        id: id,
      },
    })
    if (!group) throw new NotFoundError()
    return group
  }
)
