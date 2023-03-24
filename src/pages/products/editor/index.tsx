import { useSession } from '@blitzjs/auth'
import { BlitzPage, Routes } from '@blitzjs/next'
import { Box, Center } from '@chakra-ui/react'
import { Suspense } from 'react'
import HomeHeader from 'src/home/components/HomeHeader'
import EditorUI from 'src/products/Editor/components/Editorui'

const EditorPage: BlitzPage = () => {
  //const ses = useSession()
  return (
    <>
      <Center>
        <Box w={'75%'} maxW={'1200px'}>
          <Suspense fallback={'...'}>
            <HomeHeader />
          </Suspense>

          <Suspense fallback={<div>Загружается </div>}>
            <EditorUI />
          </Suspense>
        </Box>
      </Center>
    </>
  )
}

EditorPage.authenticate = { role: 'ADMIN', redirectTo: Routes.HomePage() }
export default EditorPage
