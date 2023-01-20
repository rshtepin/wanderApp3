import { resolver } from '@blitzjs/rpc'
import db, { Prisma } from 'db'
import { paginate } from 'blitz'

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
      count: () => db.products.count({ where }),
      query: (paginateArgs) => db.products.findMany({ ...paginateArgs, where, orderBy }),
    })
    console.log(products)
    return {
      products,
      nextPage,
      hasMore,
      count,
    }
  }
)
