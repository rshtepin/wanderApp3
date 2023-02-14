import { resolver } from '@blitzjs/rpc'
import db, { Prisma, ProductType } from 'db'
import { paginate } from 'blitz'

interface GetProductGroupFieldsInput
  extends Pick<Prisma.UserFindManyArgs, 'orderBy' | 'skip' | 'take' | 'productType'> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ orderBy, skip = 0, take = 100, productType }: GetProductGroupFieldsInput) => {
    const {
      items: groups,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.field_group.count(),
      query: (paginateArgs, productType) =>
        db.field_group.findMany({
          where: { productType },
          ...paginateArgs,
          orderBy,
        }),
    })
    console.log('productType')
    console.log(productType)
    return {
      groups,
      nextPage,
      hasMore,
      count,
    }
  }
)
