import { Box, Center } from '@chakra-ui/react'
import HomeBody from './HomeBody'
import HomeFooter from './HomeFooter'
import HomeHeader from './HomeHeader'
import HomeContactForm from './HomeContactForm'
import { Suspense } from 'react'
const HomeComponent = () => {
  return (
    <>
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
