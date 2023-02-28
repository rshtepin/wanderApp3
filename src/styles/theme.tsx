import { extendTheme } from '@chakra-ui/react'
import { Global } from '@emotion/react'

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: '#001d00',
        color: 'white',
      },
    },
  },
  fonts: {
    heading: 'Tilda Sans Extra',
    body: 'Tilda Sans',
  },
})

const AppTheme = extendTheme(theme)

export default AppTheme
