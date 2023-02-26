import { Box, Stack, Image, Divider, Text, Grid, GridItem, Center } from '@chakra-ui/react'
import React from 'react'

const HomeBody = () => {
  const LogoText = 'media/images/landing/dw-04.svg'
  const LogoStar = 'media/images/landing/dw-05.svg'
  const LogoITBastion = 'media/images/landing/it_bastion_logo_3.png'
  const LogoSearchInform = 'media/images/landing/searchInform_logo.svg'
  const LogoGraviton = 'media/images/landing/gravitongreylogo.svg'
  const LogoRDW = 'media/images/landing/rdw_logo.svg'
  const LogoDepoComp = 'media/images/logo_depo.png'
  const LogoR7Office = 'media/images/r7office_logo_white.png'

  return (
    <>
      <Box>
        <Stack direction={'row'} alignItems={'baseline'} mb={4}>
          <Image w={'60%'} src={LogoText} alt="DW" />
          <Image w={'40%'} src={LogoStar} alt="DW" className="imageRotate" />
        </Stack>
        <Box h={'2px'} w={'60%'} bg={'#05fe5f'} mb={2}></Box>
        <Text fontSize={20} color={'#05fe5f'} mb={4}>
          Креативная IT компания
        </Text>
        <Box>
          <GridItem pl="2" area={'header'} mb={5}>
            <Center fontSize={'24px'} fontWeight={'thin'} color={'#858585'}>
              Ключевые партнеры
            </Center>
          </GridItem>
          <Grid templateColumns="repeat(3, 2fr)" gap={6}>
            <GridItem w="100%" h="10">
              <Center>
                <Image w="50%" src={LogoITBastion} className="img-desaturate" />
              </Center>
            </GridItem>
            <GridItem w="100%" h="10">
              <Center>
                <Image w="50%" src={LogoSearchInform} className="img-desaturate" />
              </Center>
            </GridItem>
            <GridItem w="100%" h="10">
              <Center>
                <Image w="50%" src={LogoR7Office} className="img-desaturate" />
              </Center>
            </GridItem>
            <GridItem w="100%" h="10">
              <Center>
                <Image w="50%" src={LogoRDW} className="img-desaturate" />
              </Center>
            </GridItem>
            <GridItem w="100%" h="10">
              <Center>
                <Image w="50%" src={LogoDepoComp} className="img-desaturate" />
              </Center>
            </GridItem>
            <GridItem w="100%" h="10">
              <Center>
                <Image w="50%" src={LogoGraviton} className="img-desaturate" />
              </Center>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default HomeBody
