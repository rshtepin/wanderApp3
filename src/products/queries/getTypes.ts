import { resolver } from '@blitzjs/rpc'
import db, { Prisma } from 'db'
import { paginate } from 'blitz'
interface GetProductTypes
  extends Pick<Prisma.UserFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetProductTypes) => {
    const {
      items: types,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.productType.count(),
      query: (paginateArgs) => db.productType.findMany({ ...paginateArgs, orderBy }),
    })

    return {
      types,
      nextPage,
      hasMore,
      count,
    }
  }
)
