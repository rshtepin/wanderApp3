import { Routes, BlitzPage } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import logout from 'src/auth/mutations/logout'
import { useMutation, usePaginatedQuery } from '@blitzjs/rpc'
import { AllProducts } from 'src/products/components/AllProducts'
import { Box, Button } from '@chakra-ui/react'

import { ProductTypesMenu } from 'src/products/Editor/components/EditorTypesMenu'
import getTypes from 'src/products/mutations/getTypes'
import getProducts from 'src/products/queries/getProducts'
import { usePagination } from 'src/core/hooks/usePagination'
import { useEffect, useState } from 'react'
import { IProduct, IProductTypes } from 'src/types'
import Link from 'next/link'
import ModalAddProductProp from 'src/products/components/ModalAddProductProp'
import { useSession } from '@blitzjs/auth'
import addUpdateProduct from 'src/products/mutations/addUpdateProduct'
const Background: FC = () => {
  return (
    <div id="app-background2">
      <div id="app-background-image2" className="background-image2" />
    </div>
  )
}

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
}
const ProductsPage: BlitzPage = () => {
  const [currentProducts, SetCurrnetProducts] = useState<IProduct[]>([])

  const ITEMS_PER_PAGE = 30
  const [logoutMutation] = useMutation(logout)
  const pagination = usePagination()

  const [{ types }]: IProductTypes[] = usePaginatedQuery(getTypes, {
    where: {},
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

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
    <div id="app">
      <Layout>
        <div style={{ width: '50vw', padding: '4px 0 20px 0' }}>
          <ProductTypesMenu type={types} onChange={tabsChange} />
        </div>
        <AllProducts
          product={currentProducts}
          type={currentTab}
          onDelete={onDelete}
          compare={compare}
        />
        <AdminBlock />
        <Button
          mt={2}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <Background />
      </Layout>
    </div>
  )
}

ProductsPage.authenticate = { redirectTo: Routes.LoginP() }

export default ProductsPage
