import {
  Box,
  Stack,
  Image,
  Text,
  Grid,
  GridItem,
  Center,
  HStack,
  VStack,
  List,
  ListItem,
  UnorderedList,
  Wrap,
  WrapItem,
  Link,
} from '@chakra-ui/react'
import { Player } from '@lottiefiles/react-lottie-player'

import useDeviceSize from '../helpers/useDeviceSize'

const HomeBody = () => {
  const LogoText = 'media/images/landing/dw-04.svg'
  const LogoStar = 'media/images/landing/dw-05.svg'
  const LogoITBastion = '/media/images/landing/it_bastion_logo_3.png'
  const LogoSearchInform = 'media/images/landing/searchInform_logo.svg'
  const LogoGraviton = 'media/images/landing/gravitongreylogo.svg'
  const LogoRDW = 'media/images/landing/rdw_logo.svg'
  const LogoDepoComp = '/media/images/landing/logo_depo.png'
  const LogoR7Office = '/media/images/landing/r7office_logo.png'
  const [width, height] = useDeviceSize()

  return (
    <>
      <Box>
        <Stack direction={'row'} alignItems={'baseline'} mb={4}>
          <Image w={'60%'} src={LogoText} alt="DW" />
          {/* <Image w={'40%'} src={LogoStar} alt="DW" className="imageRotate" /> */}
          <Player autoplay loop src="/media/images/landing/logoStarAnimation.json"></Player>
        </Stack>
        <Box h={'2px'} w={'60%'} bg={'#05fe5f'} mb={2}></Box>
        <Text fontSize={20} color={'#05fe5f'} mb={width! > 800 ? '4' : '8'}>
          Креативная IT компания
        </Text>
        <Box>
          <GridItem pl="2" area={'header'} mb={5}>
            <Center fontSize={'24px'} fontWeight={'thin'} color={'#858585'}>
              Ключевые партнеры
            </Center>
          </GridItem>
          <Grid
            templateColumns={width! > 800 ? 'repeat(3, 2fr)' : 'repeat(2, 3fr)'}
            gap={6}
            alignItems={'baseline'}
            mb={width! > 800 ? '0' : '8'}
          >
            <GridItem w="100%" h="10">
              <Link href="https://it-bastion.com/">
                <Center>
                  <Image
                    w={width! > 800 ? '50%' : '90%'}
                    src={LogoITBastion}
                    className="img-desaturate"
                    alt=""
                  />
                </Center>
              </Link>
            </GridItem>
            <GridItem w="100%" h="10">
              <Link href="https://searchinform.ru/">
                <Center>
                  <Image
                    w={width! > 800 ? '50%' : '90%'}
                    src={LogoSearchInform}
                    className="img-desaturate"
                    alt=""
                  />
                </Center>
              </Link>
            </GridItem>
            <GridItem w="100%" h="10">
              <Link href="https://r7-office.ru/">
                <Center>
                  <Image
                    w={width! > 800 ? '50%' : '90%'}
                    src={LogoR7Office}
                    className="img-desaturate"
                    alt=""
                  />
                </Center>
              </Link>
            </GridItem>
            <GridItem w="100%" h="10">
              <Link href="https://rdwcomp.ru/">
                <Center>
                  <Image
                    w={width! > 800 ? '50%' : '90%'}
                    src={LogoRDW}
                    className="img-desaturate"
                    alt=""
                  />
                </Center>
              </Link>
            </GridItem>
            <GridItem w="100%" h="10">
              <Link href="https://www.depo.ru/">
                <Center>
                  <Image
                    w={width! > 800 ? '50%' : '90%'}
                    src={LogoDepoComp}
                    className="img-desaturate"
                    alt=""
                  />
                </Center>
              </Link>
            </GridItem>
            <GridItem w="100%" h="10">
              <Link href="https://graviton.ru/">
                <Center>
                  <Image
                    w={width! > 800 ? '50%' : '90%'}
                    src={LogoGraviton}
                    className="img-desaturate"
                    alt=""
                  />
                </Center>
              </Link>
            </GridItem>
          </Grid>
        </Box>
        <Box mb={16}>
          <HStack id="services">
            <Image w={'50%'} src="/media/images/landing/photo.svg" alt=""></Image>
            <Center>
              <VStack textAlign={'left'}>
                <Text
                  fontSize={width! > 800 ? '36px' : '26px'}
                  fontWeight={'500'}
                  color={'#00fe5f'}
                >
                  ИНТЕГРАЦИИ
                </Text>
                <Text fontSize={width! > 800 ? '20px' : '16px'} fontWeight={'300'}>
                  Проектирование ИТ/ИБ инфраструктуры. Партнерские отношениям с лидерами отрасли ИТ
                  и ИБ.
                </Text>
              </VStack>
            </Center>
          </HStack>
        </Box>
        <Box mb={16}>
          <HStack>
            <Center>
              <VStack textAlign={'left'}>
                <Text
                  fontSize={width! > 800 ? '36px' : '26px'}
                  fontWeight={'500'}
                  color={'#00fe5f'}
                >
                  САЙТЫ И СЕРВИСЫ
                </Text>
                <Text fontSize={width! > 800 ? '20px' : '16px'} fontWeight={'300'}>
                  Аналитика, исследования. Проектирование UI/UX. Адаптивный дизайн. Верстка.
                  Разработка логики, интеграция шаблонов с CMS. Внедрение. Наполнение контентом.
                  Тестирование. Поддержка.
                </Text>
              </VStack>
            </Center>
            <Image w={'50%'} src="/media/images/landing/photo2.svg" alt=""></Image>
          </HStack>
        </Box>
        <Box mb={16}>
          <HStack>
            <Image w={'50%'} src="/media/images/landing/photo3.svg" alt=""></Image>
            <Center>
              <VStack textAlign={'left'}>
                <Text
                  fontSize={width! > 800 ? '36px' : '26px'}
                  fontWeight={'500'}
                  color={'#00fe5f'}
                >
                  БРЕНДИНГ И АЙДЕНТИКА
                </Text>
                <Text fontSize={width! > 800 ? '20px' : '16px'} fontWeight={'300'}>
                  Брендбук. Дизайн-код. Фирменный стиль. Платформа бренда.
                </Text>
              </VStack>
            </Center>
          </HStack>
        </Box>
        <Box mb={16}>
          <HStack>
            <Center>
              <VStack textAlign={'left'}>
                <Text
                  fontSize={width! > 800 ? '36px' : '26px'}
                  fontWeight={'500'}
                  color={'#00fe5f'}
                >
                  BIM-моделирование
                </Text>
                <Text fontSize={width! > 800 ? '20px' : '16px'} fontWeight={'300'}>
                  Информационное моделирование объектов капитального строительства по вашему
                  стандарту. Внедрение и консультирование, поддержка.
                </Text>
              </VStack>
            </Center>
            <Image w={'50%'} src="/media/images/landing/BIM.svg" alt=""></Image>
          </HStack>
        </Box>
        <Box mb={16} textAlign="center">
          <Text fontSize={width! > 800 ? '36px' : '26px'} fontWeight={'500'} color={'#00fe5f'}>
            СЕРВИС РАЗРАБОТКИ ЦИФРОВЫХ ПЛАТФОРМ
          </Text>
          <Text fontSize={width! > 800 ? '20px' : '16px'} fontWeight={'300'} mb={12}>
            Мы предлагаем вашему бизнесу полный набор инструментов управления проектами продуктовой
            разработки
          </Text>
        </Box>
        <Center id="company">
          <Box mb={16} textAlign="center">
            <Text
              fontSize={width! > 800 ? '36px' : '26px'}
              fontWeight={600}
              color={'rgb(0, 254, 95)'}
            >
              DW ИНТЕГРАЦИЯ
            </Text>
            <Text
              fontSize={width! > 800 ? '20px' : '16px'}
              fontWeight={300}
              lineHeight={1.5}
              mb={6}
            >
              Портфель DW содержит современные решения, применение которых обеспечивает комплексную
              оптимизацию затрат на ИТ, а также снижение рисков, связанных с непрерывностью бизнеса
            </Text>

            <List textAlign={'center'}>
              <Wrap spacing={4} justify="center">
                <ListItem minW={'150px'} maxW={'360px'}>
                  <Text
                    textAlign={'left'}
                    fontWeight={700}
                    fontSize={width! > 800 ? '32px' : '30px'}
                    paddingTop={'8px'}
                    paddingBottom={'6px'}
                    marginRight={'20px'}
                  >
                    ИНЖЕНЕРНАЯ ИНФРАСТРУКТУРА
                  </Text>
                  <Box h={'3px'} w={'100%'} bg={'white'}></Box>
                  <UnorderedList textAlign={'left'} fontSize={width! > 800 ? '18px' : '16px'}>
                    <ListItem>проектирование</ListItem>
                    <ListItem>поставка надежных решений</ListItem>
                    <ListItem>монтаж и пусконаладка</ListItem>
                    <ListItem>
                      Широкопрофильная и премиальная дистрибуция компьютеров, цифровых устройств и
                      аксессуаров; телекоммуникационного, электротехнического и инженерного
                      оборудования
                    </ListItem>
                  </UnorderedList>
                </ListItem>

                <ListItem minW={'150px'} maxW={'360px'}>
                  <Text
                    textAlign={'left'}
                    fontWeight={700}
                    fontSize={width! > 800 ? '32px' : '30px'}
                    paddingTop={'8px'}
                    paddingBottom={'6px'}
                    marginRight={'20px'}
                  >
                    ИНФОРМАЦИОННАЯ БЕЗОПАСНОСТЬ
                  </Text>
                  <Box h={'3px'} w={'100%'} bg={'white'}></Box>
                  <UnorderedList textAlign={'left'} fontSize={width! > 800 ? '18px' : '16px'}>
                    <ListItem>оценка кибербезопасности инфраструктуры</ListItem>
                    <ListItem>анализ защищенности приложений</ListItem>
                    <ListItem>обучение персонала в области ИБ</ListItem>
                    <ListItem>разработка стратегии развития ИБ</ListItem>
                    <ListItem>приведение в соответствие требованиям законодательства</ListItem>
                    <ListItem>импортозамещение средств ИБ</ListItem>
                    <ListItem>мониторинг безопасности и управление инцидентами ИБ</ListItem>
                  </UnorderedList>
                </ListItem>
              </Wrap>
            </List>
          </Box>
        </Center>
      </Box>
    </>
  )
}

export default HomeBody
