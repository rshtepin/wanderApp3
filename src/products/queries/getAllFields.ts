import { resolver } from '@blitzjs/rpc'
import db, { Prisma } from 'db'
import { paginate } from 'blitz'

interface GetProductFieldsInput
  extends Pick<Prisma.UserFindManyArgs, 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ orderBy, skip = 0, take = 100 }: GetProductFieldsInput) => {
    const {
      items: fields,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.product_variable.count(),
      query: (paginateArgs) => db.product_variable.findMany({ ...paginateArgs, orderBy }),
    })

    return {
      fields,
      nextPage,
      hasMore,
      count,
    }
  }
)
