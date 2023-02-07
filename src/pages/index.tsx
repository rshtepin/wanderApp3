import { Routes, BlitzPage } from '@blitzjs/next'

const Index: BlitzPage = () => {
  return <></>
}
Index.authenticate = { redirectTo: Routes.LoginP() }
Index.redirectAuthenticatedTo = Routes.ProductsPage()

export default Index
