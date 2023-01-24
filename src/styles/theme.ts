import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Tilda Sans',
    body: 'Tilda Sans',
  },
})

const AppTheme = extendTheme(theme)

export default AppTheme
