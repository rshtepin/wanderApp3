import { Routes, BlitzPage } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import logout from 'src/auth/mutations/logout'
import { useMutation, usePaginatedQuery } from '@blitzjs/rpc'
import AllProducts from 'src/products/components/AllProducts'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const ProductsPage: BlitzPage = () => {
  const [logoutMutation] = useMutation(logout)
  return (
    <Layout>
      <AllProducts />
      <Button
        onClick={async () => {
          await logoutMutation()
        }}
      >
        Logout
      </Button>
    </Layout>
  )
}
ProductsPage.authenticate = { redirectTo: Routes.LoginP() }

export default ProductsPage
