import { BlitzPage } from '@blitzjs/next'
import { Wrap } from '@chakra-ui/react'
import { Suspense } from 'react'

const CompareProducts: BlitzPage = ({ list }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrap width="85vw" spacing="16px" justify="center" align={'center'} mt={6}></Wrap>
    </Suspense>
  )
}
export default CompareProducts
