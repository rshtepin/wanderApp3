import { resolver } from '@blitzjs/rpc'
import db, { Prisma, ProductType } from 'db'
import { z } from 'zod'

import { paginate } from 'blitz'
interface GetProductGroupsInput
  extends Pick<Prisma.UserFindManyArgs, 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ orderBy, skip = 0, take = 100 }: GetProductGroupsInput) => {
    const {
      items: groups,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.product_variable.count(),
      query: (paginateArgs) => db.field_group.findMany({ ...paginateArgs, orderBy }),
    })

    return {
      groups,
      nextPage,
      hasMore,
      count,
    }
  }
)
