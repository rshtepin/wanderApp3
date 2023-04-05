import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from '@blitzjs/next'
import { AuthenticationError, AuthorizationError } from 'blitz'
import React, { Suspense } from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { withBlitz } from 'src/blitz-client'
import 'src/styles/globals.css'
import 'src/styles/main.scss'
import AppTheme from 'src/styles/theme'
import { Fonts } from '../styles/fonts'
import './../../public/fonts/tildasans/stylesheet.css'
function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ChakraProvider theme={AppTheme}>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Suspense>{getLayout(<Component {...pageProps} />)}</Suspense>
      </ErrorBoundary>
    </ChakraProvider>
  )
}
export default withBlitz(MyApp)
