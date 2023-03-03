import { Routes, BlitzPage } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import logout from 'src/auth/mutations/logout'
import { useMutation, usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { AllProducts } from 'src/products/components/AllProducts'
import { Box, Button, Center } from '@chakra-ui/react'
import getTypes from 'src/products/queries/getTypes'
import getProducts from 'src/products/queries/getProducts'
import { usePagination } from 'src/core/hooks/usePagination'
import { Suspense, useEffect, useState } from 'react'
import { IProduct, IProductTypes } from 'src/types'
import ModalAddProductProp from 'src/products/components/ModalAddProductProp'
import { useSession } from '@blitzjs/auth'
import addUpdateProduct from 'src/products/mutations/addUpdateProduct'
import HomeHeader from 'src/home/components/HomeHeader'

// Блок администратора
const AdminBlock: any = () => {
  const session = useSession()
  const role = session.role
  const [show, setShow] = useState(false)
  const [addProductMutation] = useMutation(addUpdateProduct)
  if (role == 'ADMIN') {
    const onHide = () => {
      setShow(false)
    }

    const onClose = () => {
      setShow(false)
    }
    const onSave = async (item) => {
      await addProductMutation({ title: item.title, type: item.type, id: -1 })
    }

    return (
      <>
        <Box mt={5}>
          <Button mr={2} mt={2} colorScheme="messenger" onClick={() => setShow(true)}>
            Добавить продукт
          </Button>
          <ModalAddProductProp show={show} onHide={onHide} onClose={onClose} onSave={onSave} />
        </Box>
      </>
    )
  }
}
const ProductsPage: BlitzPage = () => {
  const [currentProducts, SetCurrnetProducts] = useState<IProduct[]>([])

  const ITEMS_PER_PAGE = 30
  const [logoutMutation] = useMutation(logout)
  const pagination = usePagination()

  const [{ types }]: IProductTypes[] = useQuery(getTypes, {})

  const [{ products }] = usePaginatedQuery(getProducts, {
    orderBy: { order: 'asc' },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  const [currentTab, SetCurrnetTab] = useState<IProductTypes>(types[0])

  useEffect(() => {
    let prodArr: IProduct[] = []
    products.map((product) => {
      product.typeId === currentTab.id && prodArr.push(product)
    })
    return SetCurrnetProducts(prodArr)
  }, [currentTab, products])

  const tabsChange = async ({ tabName }) => {
    await SetCurrnetTab(tabName)
  }
  const onDelete = (product: IProduct) => {
    console.log(product)
  }

  const compare = (product: IProduct, flag: boolean) => {
    console.log(product)
  }

  return (
    <Center>
      <Box w={'75%'} maxW={'1200px'}>
        <Suspense>
          <HomeHeader />
        </Suspense>
        <div style={{ width: '50vw', padding: '4px 0 20px 0' }}>
          {/* <ProductTypesMenu type={types} onChange={tabsChange} /> */}
        </div>
        <AllProducts
          product={currentProducts}
          type={currentTab}
          onDelete={onDelete}
          compare={compare}
        />

        <AdminBlock />
      </Box>
    </Center>
  )
}

//ProductsPage.authenticate = { redirectTo: Routes.LoginP() }

export default ProductsPage
