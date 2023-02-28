import Script from 'next/script'
import { Box, Center, Text } from '@chakra-ui/react'
import HomeBody from './HomeBody'
import HomeFooter from './HomeFooter'
import HomeHeader from './HomeHeader'
import HomeContactForm from './HomeContactForm'
const HomeComponent = () => {
  return (
    <>
      {/* <Script src="/bg.js"></Script> */}

      <Center>
        <Box w={'75%'} maxW={'1200px'}>
          <HomeHeader />
          <HomeBody />
        </Box>
      </Center>
      <HomeContactForm />
      <HomeFooter />
    </>
  )
}
export default HomeComponent
