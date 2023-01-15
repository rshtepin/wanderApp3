import { FC, Suspense, useContext, useEffect, useState } from 'react'
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
import LabeledTextField from 'src/core/components/LabeledTextField'

enum UserStatus {
  LoggedIn = 'Logged In',
  LoggingIn = 'Logging In',
  LoggedOut = 'Logged Out',
  LogInError = 'Log In Error',
  VerifyingLogIn = 'Verifying Log In',
}

const Background: FC = () => {
  return (
    <div id="app-background">
      <div id="app-background-image" className="background-image" />
    </div>
  )
}

const useCurrentDateEffect = (): Date => {
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      const update: Date = new Date()

      if (update.getSeconds() !== date.getSeconds()) {
        setDate(update)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [date])

  return date
}
const T: ITimeUtility = {
  format: (date: Date): string => {
    const hours: string = T.formatHours(date.getHours()),
      minutes: string = date.getMinutes(),
      seconds: string = date.getSeconds()

    return `${hours}:${T.formatSegment(minutes)}`
  },
  formatHours: (hours: number): string => {
    return hours % 12 === 0 ? 12 : hours % 12
  },
  formatSegment: (segment: number): string => {
    return segment < 10 ? `0${segment}` : segment
  },
}
const Time: FC = () => {
  const date: Date = useCurrentDateEffect()

  return <span className="time">{T.format(date)}</span>
}
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
        <LoginPage />
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
const LogoWelcome: FC = () => {
  return <div className="mainlogo"></div>
}
const Home: BlitzPage = () => {
  const [userStatus, setUserStatusTo] = useState(UserStatus.LoggedOut)

  const getStatusClass = (): string => {
    return userStatus.replace(/\s+/g, '-').toLowerCase()
  }

  return (
    <Layout title="Digital Wonder">
      <div id="app" className={getStatusClass()}>
        <div className="welcome-container " onClick={() => setUserStatusTo(UserStatus.LoggingIn)}>
          <div id="welcome-container" className="mainlogo ">
            <Image className="svg" src={Logo} priority alt="Wonder Digital" />

            <div id="login-inputs" className={getStatusClass() + ' ml3'}>
              <form className="form">
                <input placeholder="Почта" className="input-field" type="email" size="40"></input>
                <input
                  placeholder="Пароль"
                  className="input-field"
                  type="password"
                  size="40"
                ></input>
                <div className="pt1 buttons-login-container">
                  <button className="button-clear">Вход</button>
                  <button className="ml1 button-clear">Регистрация</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="time-container">
          <Time />
        </div>
        <Background />
      </div>
    </Layout>
  )
}

export default Home
