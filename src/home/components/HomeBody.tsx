import { Box, Stack, Image, Divider, Text } from '@chakra-ui/react'
import React from 'react'

const HomeBody = () => {
  const LogoText = 'media/images/landing/dw-04.svg'
  const LogoStar = 'media/images/landing/dw-05.svg'
  return (
    <>
      <Box>
        <Stack direction={'row'} alignItems={'baseline'} mb={4}>
          <Image w={'60%'} src={LogoText} alt="DW" />
          <Image w={'40%'} src={LogoStar} alt="DW" className="imageRotate" />
        </Stack>
        <Box h={'2px'} w={'60%'} bg={'#05fe5f'} mb={2}></Box>
        <Text fontSize={20} color={'#05fe5f'}>
          Креативная IT компания
        </Text>
      </Box>
    </>
  )
}

export default HomeBody
