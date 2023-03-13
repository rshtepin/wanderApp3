import { AuthenticationError, PromiseReturnType } from 'blitz'
import { FC, useEffect, useState } from 'react'
import { Form, FORM_ERROR } from 'src/core/components/Form'
import { useMutation } from '@blitzjs/rpc'
import Logo from '../../static/wonderLogo.svg'
import Image from 'next/image'
import login from 'src/auth/mutations/login'
import { Login } from 'src/auth/validations'
import { LabeledTextField } from 'src/core/components/LabeledTextField'
import signup from 'src/auth/mutations/signup'
import { Signup } from 'src/auth/validations'

enum UserStatus {
  LoggedIn = 'Logged In',
  LoggingIn = 'Logging In',
  LoggedOut = 'Logged Out',
  LogInError = 'Log In Error',
  VerifyingLogIn = 'Verifying Log In',
  Registering = 'Registering',
}

// const UserInfo = () => {
//   const currentUser = useCurrentUser()
//   const [logoutMutation] = useMutation(logout)

//   if (currentUser) {
//     return (
//       <>
//         <button
//           className={styles.button}
//           onClick={async () => {
//             await logoutMutation()
//           }}
//         >
//           Logout
//         </button>
//         <div>
//           User id: <code>{currentUser.id}</code>
//           <br />
//           User role: <code>{currentUser.role}</code>
//         </div>
//       </>
//     )
//   } else {
//     return (
//       <>
//         <LoginPage />
//         {/* <Link href={Routes.SignupPage()} legacyBehavior>
//           <button className={styles.button}>Регистрация</button>
//         </Link>
//         <Link href={Routes.LoginPage()} legacyBehavior>
//           <button className={styles.loginButton}>Вход</button>
//         </Link> */}
//       </>
//     )
//   }
// }
const Background: FC = () => {
  return (
    <div id="app-background">
      <div id="app-background-image" className="background-image" />
    </div>
  )
}

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginFormP = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const [signupMutation] = useMutation(signup)
  const [userStatus, setUserStatusTo] = useState(UserStatus.LoggedOut)
  const getStatusClass = (): string => {
    return userStatus.replace(/\s+/g, '-').toLowerCase()
  }
  return (
    <div id="app" className={getStatusClass()}>
      <div className="welcome-container ">
        <div id="enter-form" className={getStatusClass()}>
          <Image
            id="image-logo"
            className="enter-logo"
            src={Logo}
            priority
            alt="Wonder Digital"
            onClick={() => setUserStatusTo(UserStatus.LoggingIn)}
          />
          <div id="form-enter-inputs" className={getStatusClass()}>
            <div id="tab-group">
              <div
                id="enter-tab"
                className={getStatusClass()}
                onClick={() => setUserStatusTo(UserStatus.LoggingIn)}
              >
                Вход
              </div>
              <div
                id="registration-tab"
                className={getStatusClass()}
                onClick={() => setUserStatusTo(UserStatus.Registering)}
              >
                Регистрация
              </div>
            </div>

            <div id="logining-inputs" className={getStatusClass()}>
              <Form
                submitText="Отправить"
                schema={Login}
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) => {
                  try {
                    const user = await loginMutation(values)
                    props.onSuccess?.(user)
                  } catch (error: any) {
                    if (error instanceof AuthenticationError) {
                      return { [FORM_ERROR]: 'Извините, эти учетные данные недействительны' }
                    } else {
                      return {
                        [FORM_ERROR]:
                          'Извините, у нас произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз. - ' +
                          error.toString(),
                      }
                    }
                  }
                }}
                className="form"
              >
                <LabeledTextField
                  label=""
                  name="email"
                  placeholder="Почта"
                  type="email"
                  size={40}
                />
                <LabeledTextField
                  label=""
                  name="password"
                  placeholder="Пароль"
                  type="password"
                  size={40}
                />
              </Form>
            </div>
            <div id="registering-inputs" className={getStatusClass()}>
              <Form
                submitText="Зарегистрироваться"
                schema={Signup}
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) => {
                  try {
                    await signupMutation(values)
                    // props.onSuccess?.()
                  } catch (error: any) {
                    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                      // This error comes from Prisma
                      return { email: 'Эта электронная почта уже используется' }
                    } else {
                      return { [FORM_ERROR]: error.toString() }
                    }
                  }
                }}
              >
                <LabeledTextField
                  label=""
                  name="email"
                  placeholder="Почта"
                  type="email"
                  size={40}
                />
                <LabeledTextField
                  label=""
                  name="password"
                  placeholder="Пароль"
                  type="password"
                  size={40}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Background />
    </div>
  )
}
// Home.authenticate = { redirectTo: '/auth/login' }

export default LoginFormP
