import { BlitzPage } from '@blitzjs/next'

import LoginFormP from 'src/auth/components/LoginFormP'
import { useRouter } from 'next/router'

const LoginP: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <LoginFormP
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : '/'
          return router.push(next)
        }}
      />
    </>
  )
}

export default LoginP
