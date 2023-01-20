import { usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { Suspense } from 'react'
import getProducts from '../queries/getProducts'
import { usePagination } from 'src/core/hooks/usePagination'
import { Routes } from '@blitzjs/next'
import ProductItem from './ProductItem'
import { Wrap, WrapItem } from '@chakra-ui/react'
const ITEMS_PER_PAGE = 30
const deleteProduct = (item) => {
  console.log(item)
}

const GetU = () => {
  const pagination = usePagination()
  const [{ products, hasMore }] = usePaginatedQuery(getProducts, {
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })
  console.log(products)
  return (
    <>
      {products.map((prod) => (
        <WrapItem key={prod.id}>
          <ProductItem key={prod.id} product={prod} onDelete={deleteProduct} />
        </WrapItem>
      ))}
    </>
  )
}
const AllProducts = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrap spacing="30px">
        <GetU />
      </Wrap>
    </Suspense>
  )
}
export default AllProducts
