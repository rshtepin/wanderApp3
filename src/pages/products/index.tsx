import { Routes, BlitzPage } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import logout from 'src/auth/mutations/logout'
import { useMutation, usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { AllProducts } from 'src/products/components/AllProducts'
import { Box, Button, Center, Divider } from '@chakra-ui/react'
import getTypes from 'src/products/queries/getTypes'
import getProducts from 'src/products/queries/getProducts'
import { usePagination } from 'src/core/hooks/usePagination'
import { Suspense, useEffect, useState } from 'react'
import { IProduct, IProductGroups, IProductTypes } from 'src/types'
import ModalAddProductProp from 'src/products/components/ModalAddProductProp'
import { useSession } from '@blitzjs/auth'
import addUpdateProduct from 'src/products/mutations/addUpdateProduct'
import HomeHeader from 'src/home/components/HomeHeader'
import ProductTypesMenu from 'src/products/components/ProductTypesMenu'

// Блок администратора

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
      const onSave = async (newProduct: IProduct) => {
        console.log(newProduct)
        await addProductMutation({
          title: newProduct.title,
          typeId: parseInt(newProduct.typeId),
          id: -1,
        })
      }

      return (
        <>
          <Box mt={5}>
            <Button mr={2} mt={2} colorScheme="messenger" onClick={() => setShow(true)}>
              Добавить продукт
            </Button>
            <ModalAddProductProp
              show={show}
              onHide={onHide}
              onClose={onClose}
              onSave={onSave}
              types={types}
            />
          </Box>
        </>
      )
    }
  }
  useEffect(() => {
    let prodArr: IProduct[] = []
    products.map((product) => {
      product.typeId === currentTab.id && prodArr.push(product)
    })
    return SetCurrnetProducts(prodArr)
  }, [currentTab, products])

  const tabsChange = async (type: IProductTypes) => {
    console.log(type.title)
    await SetCurrnetTab(type)
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

        <ProductTypesMenu type={types} onChange={tabsChange} />
        <Divider mb={4} />
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
