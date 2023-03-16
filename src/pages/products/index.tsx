import { BlitzPage, NoPageFlicker } from '@blitzjs/next'
import { Box, Center } from '@chakra-ui/react'
import { Suspense } from 'react'
import HomeHeader from 'src/home/components/HomeHeader'
import AllProductsPage from 'src/products/components/AllProductsPage'

const ProductsPage: BlitzPage = () => {
  return (
    <>
      <Center>
        <Box w={'75%'} maxW={'1200px'}>
          <Suspense fallback={'...'}>
            <HomeHeader />
          </Suspense>
          <AllProductsPage />
        </Box>
      </Center>
    </>
  )
}
export default ProductsPage
