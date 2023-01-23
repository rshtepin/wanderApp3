import { usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { Suspense } from 'react'
import getProducts from '../queries/getProducts'
import { usePagination } from 'src/core/hooks/usePagination'
import { Routes } from '@blitzjs/next'
import ProductItem from './ProductItem'
import { Wrap, WrapItem } from '@chakra-ui/react'
import { useSession } from '@blitzjs/auth'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
const ITEMS_PER_PAGE = 30
const deleteProduct = (item) => {
  console.log('УДАЛЯЕМ: ' + item)
}

const GetProductsDB = () => {
  const router = useRouter()
  const pagination = usePagination()
  const [{ products, hasMore }] = usePaginatedQuery(getProducts, {
    orderBy: { order: 'asc' },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  console.log(products)
  return (
    <>
      {products.map((item) => (
        <WrapItem key={item.id}>
          <ProductItem key={item.id} product={item} onDelete={deleteProduct} />
        </WrapItem>
      ))}
    </>
  )
}
// Блок администратора
const AdminBlock = (product, onDelete) => {
  const session = useSession()
  const userId = session.userId
  const role = session.role

  if (role == 'ADMIN')
    return (
      <>
        <Button colorScheme="yellow">Редактор шаблона продукта</Button>
        <Button colorScheme="red" onClick={() => onDelete(product.id)}>
          Добавить продукт
        </Button>
      </>
    )
}
///////////////////

const AllProducts = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrap spacing="30px">
        <GetProductsDB />
      </Wrap>
      <AdminBlock />
    </Suspense>
  )
}
export default AllProducts
