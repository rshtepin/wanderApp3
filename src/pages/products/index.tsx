import { Routes, BlitzPage } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import logout from 'src/auth/mutations/logout'
import { useMutation } from '@blitzjs/rpc'
import AllProducts from 'src/products/components/AllProducts'
import { Button } from '@chakra-ui/react'
import ModalAddProductProp from 'src/products/components/ModalAddProductProp'
import { useState } from 'react'
import addUpdateProduct from 'src/products/mutations/addUpdateProduct'
const Background: FC = () => {
  return (
    <div id="app-background2">
      <div id="app-background-image2" className="background-image2" />
    </div>
  )
}
const ProductsPage: BlitzPage = () => {
  const [logoutMutation] = useMutation(logout)

  return (
    <div id="app">
      <Layout>
        <AllProducts />
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
