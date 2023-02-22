import Head from 'next/head'
import { Box, Center, Text } from '@chakra-ui/react'
import HomeBody from './HomeBody'
import HomeFooter from './HomeFooter'
import HomeHeader from './HomeHeader'
const HomeComponent = () => {
  return (
    <>
      <Head>
        <script>
          document.body.style.backgroundColor='#001d00'; document.body.style.color='#ffffff';
        </script>
      </Head>
      <Center>
        <Box w={'60%'}>
          <HomeHeader />
          <HomeBody />
          <HomeFooter />
        </Box>
      </Center>
    </>
  )
}
export default HomeComponent
