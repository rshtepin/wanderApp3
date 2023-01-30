import { resolver } from '@blitzjs/rpc'
import db, { Prisma } from 'db'
import { paginate } from 'blitz'

interface GetProductGroupFieldsInput
  extends Pick<Prisma.UserFindManyArgs, 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ orderBy, skip = 0, take = 100 }: GetProductGroupFieldsInput) => {
    const {
      items: groups,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.field_group.count(),
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
