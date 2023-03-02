import { Routes, BlitzPage } from '@blitzjs/next'

const Index: BlitzPage = () => {
  return <></>
}
Index.authenticate = { redirectTo: Routes.HomePage() }
Index.redirectAuthenticatedTo = Routes.HomePage()
export default Index
