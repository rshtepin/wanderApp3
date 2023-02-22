import { Routes, BlitzPage } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import logout from 'src/auth/mutations/logout'
import { useMutation } from '@blitzjs/rpc'

import { Button } from '@chakra-ui/react'
import HomeComponent from 'src/home/components/HomeComponent'
const Home: BlitzPage = () => {
  const [logoutMutation] = useMutation(logout)

  return <HomeComponent />
}
Home.authenticate = { redirectTo: Routes.LoginP() }

export default Home
