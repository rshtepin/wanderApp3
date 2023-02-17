import { resolver } from '@blitzjs/rpc'
import db, { Prisma, ProductType } from 'db'
import { z } from 'zod'
import { NotFoundError } from 'blitz'
import { IProductGroups } from 'src/types'

export default resolver.pipe(
  // resolver.authorize(),
  async () => {
    return await db.field_group.findMany({ orderBy: { order: 'asc' } })
  }
)
