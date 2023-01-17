import { BlitzPage } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import LoginFormP from 'src/auth/components/LoginFormP'
import { useRouter } from 'next/router'

const LoginP: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Digital Wonder Log In">
      <LoginFormP
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : '/'
          return router.push(next)
        }}
      />
    </Layout>
  )
}

export default LoginP
