import { resolver } from '@blitzjs/rpc'
import db, { Prisma } from 'db'
import { paginate } from 'blitz'
import { IProductTypes } from 'src/types'

interface GetUsersInput
  extends Pick<Prisma.UserFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetUsersInput) => {
    const {
      items: types,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.productType.count(),
      query: () => db.productType.findMany({ where, orderBy: { order: 'asc' } }),
    })

    return {
      types,
      nextPage,
      hasMore,
      count,
    }
  }
)
