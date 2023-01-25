import { useMutation, usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { Suspense, useState } from 'react'
import getProducts from '../queries/getProducts'
import { usePagination } from 'src/core/hooks/usePagination'
import ProductItem from './ProductItem'
import { Box, Wrap, WrapItem } from '@chakra-ui/react'
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
        <ProductItem key={item.id} product={item} onDelete={delProductMutation} />
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
        <Box mt={5}>
          <Link href={'/products/template-editor'}>
            <Button mr={2} mt={2} colorScheme="yellow">
              Редактор шаблона продукта
            </Button>
          </Link>
          <Button mr={2} mt={2} colorScheme="messenger" onClick={() => setShow(true)}>
            Добавить продукт
          </Button>
          <ModalAddProductProp show={show} onHide={onHide} onClose={onClose} onSave={onSave} />
        </Box>
      </>
    )
}
///////////////////

const AllProducts = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrap className="products-container" spacing="16px" justify="center" align={'center'}>
        <GetProductsDB />
      </Wrap>

      <AdminBlock />
    </Suspense>
  )
}
export default AllProducts
