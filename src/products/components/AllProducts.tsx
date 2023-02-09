import { useMutation, usePaginatedQuery } from '@blitzjs/rpc'
import { Suspense, useState } from 'react'
import getProducts from '../queries/getProducts'
import { usePagination } from 'src/core/hooks/usePagination'
import ProductItem from './ProductItem'
import { Box, Wrap } from '@chakra-ui/react'
import { useSession } from '@blitzjs/auth'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import addUpdateProduct from '../mutations/addUpdateProduct'
import ModalAddProductProp from './ModalAddProductProp'
import Link from 'next/link'
import delProduct from '../mutations/delProduct'
import { Routes } from '@blitzjs/next'

const ITEMS_PER_PAGE = 30

const GetProductsDB = ({ compare }) => {
  const [delProductMutation] = useMutation(delProduct)

  const router = useRouter()
  const pagination = usePagination()

  const [{ products, hasMore }] = usePaginatedQuery(getProducts, {
    orderBy: { order: 'asc' },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  console.log(products)
  //const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  //const goToNextPage = () => router.push({ query: { page: page + 1 } })
  return (
    <>
      {products.map((item) => (
        <ProductItem key={item.id} product={item} onDelete={delProductMutation} compare={compare} />
      ))}
    </>
  )
}
// Блок администратора
const AdminBlock: any = () => {
  const session = useSession()
  const role = session.role
  const [show, setShow] = useState(false)
  const [addProductMutation] = useMutation(addUpdateProduct)
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

  role == 'ADMIN' && (
    <>
      <Box mt={5}>
        <Link href={Routes.TemplatEditorPage()}>
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
  const [toCompare, setToCompare] = useState<any>([])
  const compare = async ({ id, flag }) => {
    console.log('id: ' + id)
    console.log('flag: ' + flag)
    flag
      ? await setToCompare((prev) => [...prev, id])
      : await setToCompare(toCompare.filter((item) => item !== id))
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrap width="85vw" spacing="16px" justify="center" align={'center'} mt={6}>
        <GetProductsDB compare={compare} />
      </Wrap>
      <Link href={Routes.CompareProducts({ id: toCompare })}>
        <Button isDisabled={!(toCompare.length > 1)} mt={5}>
          Сравнить
        </Button>
      </Link>
      <div>{JSON.stringify(toCompare)}</div>
      <AdminBlock />
    </Suspense>
  )
}
export default AllProducts
