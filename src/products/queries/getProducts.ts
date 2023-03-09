import { resolver } from '@blitzjs/rpc'
import db, { Prisma } from 'db'
import { paginate } from 'blitz'
import { IProduct } from 'src/types'

interface GetUsersInput
  extends Pick<Prisma.UserFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetUsersInput) => {
    const {
      items: products,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.product.count({ where }),
      query: (paginateArgs) =>
        db.product.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: { Variable_value: { include: { variable: true } } },
        }),
    })

    return {
      products,
      nextPage,
      hasMore,
      count,
    }
  }
)
