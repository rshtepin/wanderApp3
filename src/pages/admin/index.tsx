import { Routes, BlitzPage } from '@blitzjs/next'

const Admin: BlitzPage = () => {
  // const [logoutMutation] = useMutation(logout)
  // const router = useRouter()
  // const session = useSession()

  return <></>
}
Admin.authenticate = { redirectTo: Routes.LoginP() }
Admin.redirectAuthenticatedTo = Routes.Index()
export default Admin
