import { Routes, BlitzPage } from '@blitzjs/next'

const Index: BlitzPage = () => {
  return <></>
}
Index.authenticate = { redirectTo: Routes.LoginP() }
Index.redirectAuthenticatedTo = '/home'

export default Index
