import { Suspense } from 'react'
import Link from 'next/link'
import Layout from 'src/core/layouts/Layout'
import { useCurrentUser } from 'src/users/hooks/useCurrentUser'
import logout from 'src/auth/mutations/logout'
import { useMutation } from '@blitzjs/rpc'
import { Routes, BlitzPage } from '@blitzjs/next'
import styles from 'src/styles/Home.module.css'
import Logo from '../static/wonderLogo.svg'
import Image from 'next/image'
import LoginPage from './auth/login'

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className={styles.button}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <LoginPage/>
        {/* <Link href={Routes.SignupPage()} legacyBehavior>
          <button className={styles.button}>Регистрация</button>
        </Link>
        <Link href={Routes.LoginPage()} legacyBehavior>
          <button className={styles.loginButton}>Вход</button>
        </Link> */}
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className={styles.globe} />

      <div className={styles.container}>
        <div className={styles.toastContainer}>
          <p>Логинимся!</p>
        </div>

        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <div className={styles.logo}>
                <Image src={Logo} priority alt="Wonder Digital" />
              </div>
              {/* Auth */}

              <div className={styles.buttonContainer}>
                <Suspense fallback="Loading...">
                  <UserInfo />
                </Suspense>
              </div>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <span>Wonder Digital 2023</span>
        </footer>
      </div>
    </Layout>
  )
}

export default Home
