import { Routes, BlitzPage } from '@blitzjs/next'
import HomeComponent from 'src/home/components/HomeComponent'

const Index: BlitzPage = () => {
  return <HomeComponent />
}
// Index.authenticate = { redirectTo: Routes.HomePage() }
// Index.redirectAuthenticatedTo = Routes.HomePage()
export default Index
