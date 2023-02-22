import { Routes, BlitzPage } from '@blitzjs/next'

const Index: BlitzPage = () => {
  return <></>
}
Index.authenticate = { redirectTo: Routes.Home() }
Index.redirectAuthenticatedTo = Routes.Home()
export default Index
