import { paginate } from 'blitz'
import { resolver } from '@blitzjs/rpc'
import db, { Prisma } from 'db'

interface GetTestingsInput
  extends Pick<Prisma.TestingFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTestingsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: testings,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.testing.count({ where }),
      query: (paginateArgs) => db.testing.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      testings,
      nextPage,
      hasMore,
      count,
    }
  }
)
