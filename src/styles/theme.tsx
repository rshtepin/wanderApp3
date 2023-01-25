import { extendTheme } from '@chakra-ui/react'
import { Global } from '@emotion/react'

const theme = extendTheme({
  fonts: {
    heading: 'Tilda Sans Extra',
    body: 'Tilda Sans',
  },
})

const AppTheme = extendTheme(theme)

export default AppTheme
