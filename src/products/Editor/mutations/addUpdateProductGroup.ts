import { resolver, usePaginatedQuery } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'

const updateProductGroup = z.object({
  id: z.number(),
  title: z.string(),
  order: z.number().optional(),
  typeId: z.number(),
})

export default resolver.pipe(
  resolver.zod(updateProductGroup),
  // resolver.authorize(),
  async ({ id, title, order, typeId }) => {
    const count = await db.field_group.count({ where: { typeId: typeId } })
    const group = await db.field_group.upsert({
      where: { id },
      update: { order: order, title: title, typeId: typeId },
      create: { title: title, typeId: typeId, order: count + 1 },
    })
    if (!group) throw new NotFoundError()
    return group
  }
)
