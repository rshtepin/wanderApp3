import { useMutation, usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { Suspense, useState } from 'react'
import getProducts from '../queries/getProducts'
import { usePagination } from 'src/core/hooks/usePagination'
import { Routes } from '@blitzjs/next'
import ProductItem from './ProductItem'
import { Wrap, WrapItem } from '@chakra-ui/react'
import { useSession } from '@blitzjs/auth'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import addUpdateProduct from '../mutations/addUpdateProduct'
import ModalAddProductProp from './ModalAddProductProp'
import Link from 'next/link'
const ITEMS_PER_PAGE = 30
import delProduct from '../mutations/delProduct'

const deleteProduct = async (item) => {
  console.log('УДАЛЯЕМ: ' + item)
}

const GetProductsDB = () => {
  const [delProductMutation] = useMutation(delProduct)
  const router = useRouter()
  const pagination = usePagination()
  const [{ products, hasMore }] = usePaginatedQuery(getProducts, {
    orderBy: { order: 'asc' },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  return (
    <>
      {products.map((item) => (
        <WrapItem key={item.id}>
          <ProductItem key={item.id} product={item} onDelete={delProductMutation} />
        </WrapItem>
      ))}
    </>
  )
}
// Блок администратора
const AdminBlock = () => {
  const session = useSession()
  const role = session.role
  const [show, setShow] = useState(false)
  const [addProductMutation] = useMutation(addUpdateProduct)
  const [compareArr, setCompareArr] = useState([])
  const onHide = () => {
    setShow(false)
  }

  const onClose = () => {
    setShow(false)
  }
  const onSave = async (item) => {
    console.log('Сейвим продукт ' + item)
    await addProductMutation({ title: item, id: -1 })
  }

  if (role == 'ADMIN')
    return (
      <>
        <Link href={'/products/template-editor'}>
          <Button colorScheme="yellow">Редактор шаблона продукта</Button>
        </Link>
        <Button colorScheme="red" onClick={() => setShow(true)}>
          Добавить продукт
        </Button>
        <ModalAddProductProp show={show} onHide={onHide} onClose={onClose} onSave={onSave} />
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
