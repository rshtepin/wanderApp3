import { Box, Center } from '@chakra-ui/react'
import { Suspense } from 'react'
import HomeHeader from 'src/home/components/HomeHeader'
import EditorUI from 'src/products/Editor/components/Editorui'

const EditorPage = () => {
  return (
    <>
      <Center>
        <Suspense>
          <Box w={'75%'} maxW={'1200px'}>
            <HomeHeader />
            <Center>
              <EditorUI />
            </Center>
          </Box>
        </Suspense>
      </Center>
    </>
  )
}

export default EditorPage
