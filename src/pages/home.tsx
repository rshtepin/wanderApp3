import { Routes, BlitzPage } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import logout from 'src/auth/mutations/logout'
import { useMutation } from '@blitzjs/rpc'
const Home: BlitzPage = () => {
  const [logoutMutation] = useMutation(logout)
  return (
    <Layout>
      <p>Залогинились</p>
      <button
        onClick={async () => {
          await logoutMutation()
        }}
      >
        Logout
      </button>
    </Layout>
  )
}
Home.authenticate = { redirectTo: Routes.LoginP() }

export default Home
