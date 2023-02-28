import React, { useEffect, useState } from 'react'
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
} from '@chakra-ui/react'

const HomeBody = () => {
  const LogoText = 'media/images/landing/dw-04.svg'
  const LogoStar = 'media/images/landing/dw-05.svg'
  const LogoITBastion = '/media/images/landing/it_bastion_logo_3.png'
  const LogoSearchInform = 'media/images/landing/searchInform_logo.svg'
  const LogoGraviton = 'media/images/landing/gravitongreylogo.svg'
  const LogoRDW = 'media/images/landing/rdw_logo.svg'
  const LogoDepoComp = '/media/images/landing/logo_depo.png'
  const LogoR7Office = '/media/images/landing/r7office_logo.png'

  const hasWindow = typeof window !== 'undefined'

  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null
    const height = hasWindow ? window.innerHeight : null
    return {
      width,
      height,
    }
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [hasWindow])

  const { height, width } = getWindowDimensions()

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
          <Grid templateColumns="repeat(3, 2fr)" gap={6} alignItems={'baseline'}>
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
        <Box mb={16}>
          <HStack>
            <Image w={'50%'} src="/media/images/landing/photo.svg" alt=""></Image>
            <Center>
              <VStack textAlign={'left'}>
                <Text fontSize={'36px'} fontWeight={'500'} color={'#00fe5f'}>
                  ИНТЕГРАЦИИ
                </Text>
                <Text fontSize={'20px'} fontWeight={'300'}>
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
                <Text fontSize={'36px'} fontWeight={'500'} color={'#00fe5f'}>
                  САЙТЫ И СЕРВИСЫ
                </Text>
                <Text fontSize={'20px'} fontWeight={'300'}>
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
                <Text fontSize={'36px'} fontWeight={'500'} color={'#00fe5f'}>
                  БРЕНДИНГ И АЙДЕНТИКА
                </Text>
                <Text fontSize={'20px'} fontWeight={'300'}>
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
                <Text fontSize={'36px'} fontWeight={'500'} color={'#00fe5f'}>
                  BIM-моделирование
                </Text>
                <Text fontSize={'20px'} fontWeight={'300'}>
                  Информационное моделирование объектов капитального строительства по вашему
                  стандарту. Внедрение и консультирование, поддержка.
                </Text>
              </VStack>
            </Center>
            <Image w={'50%'} src="/media/images/landing/BIM.svg" alt=""></Image>
          </HStack>
        </Box>
        <Box mb={16} textAlign="center">
          <Text fontSize={'36px'} fontWeight={'500'} color={'#00fe5f'}>
            СЕРВИС РАЗРАБОТКИ ЦИФРОВЫХ ПЛАТФОРМ
          </Text>
          <Text fontSize={'20px'} fontWeight={'300'} mb={12}>
            Мы предлагаем вашему бизнесу полный набор инструментов управления проектами продуктовой
            разработки
          </Text>
        </Box>
        <Box mb={16} textAlign="center">
          <Text fontSize={'42px'} fontWeight={600} color={'rgb(0, 254, 95)'}>
            DW ИНТЕГРАЦИЯ
          </Text>
          <Text fontSize={'24px'} fontWeight={300} lineHeight={1.5}>
            Портфель DW содержит современные решения, применение которых обеспечивает комплексную
            оптимизацию затрат на ИТ, а также снижение рисков, связанных с непрерывностью бизнеса
          </Text>
          <Center>
            <List spacing={3}>
              <Wrap spacing={'30px'}>
                <WrapItem>
                  <ListItem minW={'150px'} maxW={'380px'}>
                    <Text
                      textAlign={'left'}
                      fontWeight={700}
                      fontSize={'32px'}
                      paddingTop={'8px'}
                      paddingBottom={'6px'}
                      marginRight={'20px'}
                    >
                      ИНЖЕНЕРНАЯ ИНФРАСТРУКТУРА
                    </Text>
                    <Box h={'3px'} w={'100%'} bg={'white'}></Box>
                    <UnorderedList textAlign={'left'}>
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
                </WrapItem>
                <WrapItem>
                  <ListItem minW={'150px'} maxW={'380px'}>
                    <Text
                      textAlign={'left'}
                      fontWeight={700}
                      fontSize={'32px'}
                      paddingTop={'8px'}
                      paddingBottom={'6px'}
                      marginRight={'20px'}
                    >
                      ИНФОРМАЦИОННАЯ БЕЗОПАСНОСТЬ
                    </Text>
                    <Box h={'3px'} w={'100%'} bg={'white'}></Box>
                    <UnorderedList textAlign={'left'}>
                      <ListItem>оценка кибербезопасности инфраструктуры</ListItem>
                      <ListItem>анализ защищенности приложений</ListItem>
                      <ListItem>обучение персонала в области ИБ</ListItem>
                      <ListItem>разработка стратегии развития ИБ</ListItem>
                      <ListItem>приведение в соответствие требованиям законодательства</ListItem>
                      <ListItem>импортозамещение средств ИБ</ListItem>
                      <ListItem>мониторинг безопасности и управление инцидентами ИБ</ListItem>
                    </UnorderedList>
                  </ListItem>
                </WrapItem>
                <WrapItem>
                  <ListItem minW={'150px'} maxW={'380px'}>
                    <Text
                      textAlign={'left'}
                      fontWeight={700}
                      fontSize={'32px'}
                      paddingTop={'8px'}
                      paddingBottom={'6px'}
                      marginRight={'20px'}
                    >
                      ИНФОРМАЦИОННАЯ БЕЗОПАСНОСТЬ
                    </Text>
                    <Box h={'3px'} w={'100%'} bg={'white'}></Box>
                    <UnorderedList textAlign={'left'}>
                      <ListItem>оценка кибербезопасности инфраструктуры</ListItem>
                      <ListItem>анализ защищенности приложений</ListItem>
                      <ListItem>обучение персонала в области ИБ</ListItem>
                      <ListItem>разработка стратегии развития ИБ</ListItem>
                      <ListItem>приведение в соответствие требованиям законодательства</ListItem>
                      <ListItem>импортозамещение средств ИБ</ListItem>
                      <ListItem>мониторинг безопасности и управление инцидентами ИБ</ListItem>
                    </UnorderedList>
                  </ListItem>
                </WrapItem>
              </Wrap>
            </List>
          </Center>
        </Box>
      </Box>
    </>
  )
}

export default HomeBody
{
  /* <Wrap color={'black'} spacing="30px">
            <WrapItem
              bg={'white'}
              borderRadius={9}
              maxW={dimension.width < 1160 ? '100%' : '30%'}
              minH={dimension.width < 1160 ? 'auto' : '500px'}
            >
              <Box padding={'30px'} textAlign={'left'}>
                <Image
                  w={'75px'}
                  src="/media/images/landing/icon_smartphone.svg"
                  alt=""
                  mb={6}
                ></Image>
                <Text fontSize={'20px'} fontWeight={'500'} color={'#001d00'}>
                  Развитие бренда, основанное на данных
                </Text>
                <Text fontSize={'16px'} fontWeight={'300'}>
                  Информационное моделирование объектов капитального строительства по вашему
                  стандарту. Внедрение и консультирование, поддержка.
                </Text>
              </Box>
            </WrapItem>
            <WrapItem
              bg={'white'}
              borderRadius={9}
              maxW={dimension.width < 1160 ? '100%' : '30%'}
              minH={dimension.width < 1160 ? 'auto' : '500px'}
            >
              <Box padding={'30px'} textAlign={'left'}>
                <Image
                  w={'75px'}
                  src="/media/images/landing/icon_pointer.svg"
                  alt=""
                  mb={6}
                ></Image>
                <Text fontSize={'20px'} fontWeight={'500'} color={'#001d00'}>
                  Разработка платформы
                </Text>
                <Text fontSize={'16px'} fontWeight={'300'}>
                  Благодаря нашему опыту в разработке платформ и вашему видению продукта, мы можем
                  создать процветающую экосистему интегрированных решений и поставщиков услуг, чтобы
                  вы могли достичь эффективности за счет масштабирования, сокращая при этом
                  производственные затраты.
                </Text>
              </Box>
            </WrapItem>
            <WrapItem
              bg={'white'}
              borderRadius={9}
              maxW={dimension.width < 1160 ? '100%' : '30%'}
              minH={dimension.width < 1160 ? 'auto' : '500px'}
            >
              <Box padding={'30px'} textAlign={'left'}>
                <Image w={'75px'} src="/media/images/landing/icon_paper.svg" alt="" mb={6}></Image>
                <Text fontSize={'20px'} fontWeight={'500'} color={'#001d00'}>
                  Межотраслевые знания в предметной области
                </Text>
                <Text fontSize={'16px'} fontWeight={'300'}>
                  Мы предоставляем услуги консалтинга и разработки цифровых платформ компаниям,
                  находящимся на разных этапах их рыночных и цифровых путешествий. Мы знаем, как
                  подойти к проблемам с неожиданной стороны и воплотить их в индивидуальные решения
                  для наших клиентов.
                </Text>
              </Box>
            </WrapItem>
            <WrapItem
              bg={'white'}
              borderRadius={9}
              maxW={dimension.width < 1160 ? '100%' : '30%'}
              minH={dimension.width < 1160 ? 'auto' : '500px'}
            >
              <Box padding={'30px'} textAlign={'left'}>
                <Image w={'75px'} src="/media/images/landing/icon_world.svg" alt="" mb={6}></Image>
                <Text fontSize={'20px'} fontWeight={'500'} color={'#001d00'}>
                  Глубокий опыт работы с большими данными
                </Text>
                <Text fontSize={'16px'} fontWeight={'300'}>
                  Платформенные решения процветают благодаря передовой аналитике данных, работающей
                  на защищенных платформах управления данными. Инженеры DW по обработке данных могут
                  помочь вам лучше разобраться в данных, которыми вы владеете.
                </Text>
              </Box>
            </WrapItem>
            <WrapItem
              bg={'white'}
              borderRadius={9}
              maxW={dimension.width < 1160 ? '100%' : '30%'}
              minH={dimension.width < 1160 ? 'auto' : '500px'}
            >
              <Box padding={'30px'} textAlign={'left'}>
                <Image
                  w={'75px'}
                  src="/media/images/landing/icon_paper_arrowup.svg"
                  alt=""
                  mb={6}
                ></Image>
                <Text fontSize={'20px'} fontWeight={'500'} color={'#001d00'}>
                  DevOps
                </Text>
                <Text fontSize={'16px'} fontWeight={'300'}>
                  Успех цифровых платформ — это общая сумма вкладов партнеров платформы. Убедитесь,
                  что каждая система, процесс и API способствуют, а не препятствуют вашему росту,
                  используя опыт нашей команды.
                </Text>
              </Box>
            </WrapItem>
            <WrapItem
              bg={'white'}
              borderRadius={9}
              maxW={dimension.width < 1160 ? '100%' : '30%'}
              minH={dimension.width < 1160 ? 'auto' : '500px'}
            >
              <Box padding={'30px'} textAlign={'left'}>
                <Image w={'75px'} src="/media/images/landing/icon_gear.svg" alt="" mb={6}></Image>
                <Text fontSize={'20px'} fontWeight={'500'} color={'#001d00'}>
                  UI/UX
                </Text>
                <Text fontSize={'16px'} fontWeight={'300'}>
                  Платформам цифровых технологий с неуклюжими интерфейсами трудно наращивать свою
                  клиентскую базу. Наша команда дизайнеров UI/UX интегрируется в процесс разработки
                  платформы, чтобы обеспечить превосходный пользовательский интерфейс во всех точках
                  соприкосновения с клиентами.
                </Text>
              </Box>
            </WrapItem>
          </Wrap> */
}