import { BlitzPage } from '@blitzjs/next'

import HomeComponent from 'src/home/components/HomeComponent'

const HomePage: BlitzPage = () => {
  return <HomeComponent />
}
//Home.authenticate = { redirectTo: Routes.LoginP() }

export default HomePage
