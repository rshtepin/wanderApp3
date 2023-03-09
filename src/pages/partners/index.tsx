import { BlitzPage } from '@blitzjs/next'
import { Box, Container, Img, Link, List, ListItem, Stack, Text } from '@chakra-ui/react'
import { Suspense } from 'react'

import HomeHeader from 'src/home/components/HomeHeader'

const PartnersPage: BlitzPage = () => {
  return (
    <Container w={'75%'} maxW={'1200px'} justifyContent={'space-between'} centerContent>
      <Suspense>
        <HomeHeader />
      </Suspense>
      <Box maxW={'760px'}>
        <Text textAlign={'center'} fontWeight={600} fontSize={'46px'} mb={'24'}>
          Партнеры
        </Text>
        <List>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/it_bastion_logo_3.png"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  АйТИ БАСТИОН
                </Text>
                <Text mb={3}>
                  «АйТи Бастион» – производитель системы контроля действий поставщиков ИТ-услуг.
                  СКДПУ НТ – комплексный продукт «АйТи Бастион», объединяющий в себе функционал
                  системы контроля действий ИТ-поставщиков СКДПУ с Центром мониторинга и аналитики,
                  модулем отчётности, модулем отказоустойчивости и масштабирования, модулем
                  профилирования пользователей. Эта система обеспечивает всю функциональность PAM –
                  от входа пользователя в систему до «умного» анализа потенциального инцидента.
                  СКДПУ НТ внесен в Реестр отечественного ПО и сертифицирован ФСТЭК России. На
                  начало 2022 года заказчики «АйТи Бастион» – более 140 российских компаний из
                  разных отраслей, в том числе нефтегазовой, энергетической, банковской, организаций
                  государственного сектора, ритейла и медицины.
                </Text>
                <Link href="https://it-bastion.com/" isExternal>
                  www.it-bastion.com
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/searchInform_logo_whitetag.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  Searchinform
                </Text>
                <Text mb={3}>
                  Компания «СёрчИнформ» – ведущий российский разработчик средств информационной
                  безопасности. Входит в НП «Руссофт», член АПКИТ. Аккредитована в качестве
                  ИТ-компании.
                </Text>
                <Link href="https://searchinform.ru/" isExternal>
                  www.searchinform.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/positivtechnology.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  Positive Technologies
                </Text>
                <Text mb={3}>
                  Positive Technologies — ведущий разработчик решений для информационной
                  безопасности с историей в 20 лет.
                </Text>
                <Link href="https://www.ptsecurity.com/" isExternal>
                  www.ptsecurity.com
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/infowatch.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  INFOWATCH
                </Text>
                <Text mb={3}>
                  Компания InfoWatch разрабатывает технологии и продукты для снижения рисков
                  информационной безопасности, защиты и анализа корпоративных данных для компаний,
                  которые видят свое будущее цифровым.
                </Text>
                <Link href="https://www.infowatch.ru/" isExternal>
                  www.infowatch.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/securitycodelogo.png"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  Код Безопасности
                </Text>
                <Text mb={3}>
                  «Код Безопасности» - российский разработчик сертифицированных средств защиты
                  информации, которые обеспечивают защиту конечных станций и серверов, периметра
                  сети, современных виртуальных инфраструктур и мобильных устройств сотрудников.
                  Продукты компании применяются для защиты конфиденциальной информации, коммерческой
                  тайны, персональных данных и сведений, составляющих государственную тайну.
                </Text>
                <Link href="https://www.securitycode.ru/" isExternal>
                  www.securitycode.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/Infoprotect-Parner_for-dark-bg_RGB.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  Cyberprotect
                </Text>
                <Text mb={3}>
                  Киберпротект — российский разработчик ПО для защиты данных, резервного копирования
                  и восстановления виртуальных, физических и облачных сред. Мы предоставляем
                  масштабируемые решения мирового уровня для надежной киберзащиты, быстрого
                  восстановления данных и гарантии отказоустойчивости информационных систем.
                </Text>
                <Link href="https://cyberprotect.ru/" isExternal>
                  www.cyberprotect.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/safeInspectLogo.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  SafeInspect (Новые технологии безопасности)
                </Text>
                <Text mb={3}>
                  Система контроля привилегированных пользователей SafeInspect позволяет
                  обеспечивать эффективный контроль подключений привилегированных пользователей к
                  критически важным объектам информационной системы предприятия.
                </Text>
                <Link href="https://www.newinfosec.ru/products/safeinspect" isExternal>
                  www.newinfosec.ru/products/safeinspect
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/staffcop_logo_2022_letters_only_white.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  Staffcop
                </Text>
                <Text mb={3}>
                  Компания «Атом Безопасность» — российский разработчик ИТ-решений в области
                  информационной безопасности и контроля действий персонала. Более 10 лет вендор
                  разрабатывает программы для повышения эффективности работы и снижения рисков,
                  связанных с внутренними угрозами информационной безопасности.
                </Text>
                <Link href="https://www.staffcop.ru/" isExternal>
                  www.staffcop.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/r7office_logo.png"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  R7
                </Text>
                <Text mb={3}>
                  Российский разработчик офисного программного обеспечения. Ключевым продуктом
                  компании является офисный пакет «Р7-Офис», который входит в Реестр отечественного
                  ПО.
                </Text>
                <Link href="https://r7-office.ru/" isExternal>
                  www.r7-office.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/kickidler-logo.png"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  Kickidler
                </Text>
                <Text mb={3}>
                  Kickidler – программное обеспечение, позволяющее вести учет и контроль времени
                  сотрудников за рабочими компьютерами. Разработчиком Kickidler является компания
                  ООО &quot;АйТи Сервис Менеджмент&quot;.
                </Text>
                <Link href="https://www.kickidler.com/ru/" isExternal>
                  www.kickidler.com/ru/
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/Loginom_Logo.png"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  Loginom
                </Text>
                <Text mb={3}>
                  Loginom Company специализируется на разработке систем для глубокого анализа
                  данных, охватывающих вопросы сбора, интеграции, очистки данных, построения моделей
                  и визуализации.
                </Text>
                <Link href="https://loginom.ru/" isExternal>
                  www.loginom.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/gigalink.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  ГИГАЛИНК
                </Text>
                <Text mb={3}>
                  Бренд GIGALINK начал свой путь в 2008 году и продолжает успешно развиваться на
                  российском IT-рынке. Разработчиком, владельцем бренда и крупнейшим дистрибьютором
                  является компания Тайле. Под маркой нашего бренда мы поставляем компоненты для
                  построения оптических линий любой сложности.
                </Text>
                <Link href="https://giga-link.ru/" isExternal>
                  www.giga-link.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/nikomax.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  NIKOMAX
                </Text>
                <Text mb={3}>
                  Структурированные кабельные системы NIKOMAX включают в себя неэкранированные
                  решения категорий 5, 5е, 6 и экранированные решения категории 5е, 6 и 6А. Вся
                  продукция обеспечена соответствующими сертификатами и потому может быть
                  использована в проектах любого масштаба.
                </Text>
                <Link href="https://nikomax.ru/" isExternal>
                  www.nikomax.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/tlk.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  TLK
                </Text>
                <Text mb={3}>
                  Продукция TLK известна на российском рынке с 2004 г. Под этой торговой маркой
                  поставляется телекоммуникационное оборудование - напольные, настенные,
                  антивандальные и серверные шкафы, стойки и различные аксессуары к ним.
                </Text>
                <Link href="https://tlk-rc.ru/" isExternal>
                  www.tlk-rc.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/qsan_logo.png"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  QSAN
                </Text>
                <Text mb={3}>
                  QSAN разрабатывает системы хранения корпоративного класса, которые обеспечивают
                  выдающуюся производительность, надежную защиту данных и комплексное управление.
                  QSAN стремится обеспечить отрасль высококачественными, масштабируемыми и
                  надежными, но в то же время простыми в обслуживании, системами хранения данных.
                </Text>
                <Link href="https://www.qsan.com/" isExternal>
                  www.qsan.com
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/Aerodisk_blue_ru.png"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  Аэродиск
                </Text>
                <Text mb={3}>
                  АЭРОДИСК — российский производитель инновационных решений в области хранения
                  данных и виртуализации. Ведущими продуктами и решениями компании являются системы
                  хранения данных АЭРОДИСК ENGINE, АЭРОДИСК Восток и гиперконвергентная система
                  АЭРОДИСК vAIR. Программное обеспечение АЭРОДИСК зарегистрировано в Роспатенте,
                  Минпромторге и в реестре отечественного ПО Министерства цифрового развития, связи
                  и массовых коммуникаций Российской Федерации.
                </Text>
                <Link href="https://aerodisk.ru/" isExternal>
                  www.aerodisk.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/Merlion_logo-white.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  MERLION
                </Text>
                <Text mb={3}>
                  Крупнейшая российская компания на рынке IT, бытовой техники, канцелярских товаров
                  и офисной мебели.
                </Text>
                <Link href="https://merlion.com/" isExternal>
                  www.merlion.com
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/depocomputerslogo.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  DEPO Computers
                </Text>
                <Text mb={3}>
                  DEPO Computers - системообразующее предприятие, крупнейшая российская компания в
                  области внедрения цифровых технологий в России. Компания DEPO Computers производит
                  российские высокотехнологичные клиентские устройства, серверное и инфраструктурное
                  оборудование, а также внедряет интеграционные проекты любой сложности.
                </Text>
                <Link href="https://www.depo.ru/" isExternal>
                  www.depo.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/gravitongreylogo.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  Гравитон
                </Text>
                <Text mb={3}>
                  Разработчик и производитель отечественной вычислительной техники, один из лидеров
                  в области импортозамещения. Продукция внесена в Единый реестр российской
                  радиоэлектронной продукции Минпромторга России, сертифицирована ТР ТС, МПТ, РЭП,
                  Минкомсвязи.
                </Text>
                <Link href="https://graviton.ru/" isExternal>
                  www.graviton.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/rdw_logo.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  RDW Computers
                </Text>
                <Text mb={3}>
                  Компания RDW Technology – российский производитель вычислительного оборудования. С
                  2015 года под брендом RDW Computers производит сертифицированную российскую
                  компьютерную технику, отвечающую требования цифровой безопасности государственной
                  инфраструктуры.
                </Text>
                <Link href="https://rdwcomp.ru/" isExternal>
                  www.rdwcomp.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/base-alt-logo.png"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  Базальт СПО
                </Text>
                <Text mb={3}>
                  «Базальт СПО» — разработчик российских операционных систем (ОС) «Альт», которые
                  позволяют создавать ИТ-инфраструктуры любого масштаба. Развитие платформы для
                  создания операционных систем на основе свободного ПО ведется более 20 лет.
                </Text>
                <Link href="https://www.basealt.ru/" isExternal>
                  www.basealt.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/LOGO_RED_SOFT_RGB_300.png"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  РедСофт
                </Text>
                <Text mb={3}>
                  РЕД СОФТ – российский разработчик и поставщик ИТ-решений и услуг; резидент
                  &quot;Сколково&quot;, член АРПП &quot;Отечественный софт&quot; и РУССОФТ. Компания
                  осуществляет комплексные проекты в области хранения и управления данными на основе
                  собственного технологического стека.
                </Text>
                <Link href="https://www.red-soft.ru/" isExternal>
                  www.red-soft.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/Astra_Linux.png"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  Astra Linux
                </Text>
                <Text mb={3}>
                  ГК Astra Linux (ООО «РусБИТех-Астра») — один из лидеров российской IT-индустрии,
                  ведущий производитель программного обеспечения, в том числе защищенных
                  операционных систем и платформ виртуализации.
                </Text>
                <Link href="https://astralinux.ru/" isExternal>
                  www.astralinux.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/3Logic.svg"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  3LOGIC
                </Text>
                <Text mb={3}>
                  Производство серверов и игровых ПК. Дистрибуция компьютерных комплектующих,
                  вычислительной техники и готовых решений. Основным направлением деятельности
                  компании является дистрибуция компьютерных комплектующих, серверов, ODM продукции.
                </Text>
                <Link href="https://3logic.ru/" isExternal>
                  www.3logic.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} alignItems={'self-start'} mb={'20'}>
              <Box minW={'40%'}>
                <Img
                  w={'200px'}
                  src="/media/images/landing/Axoft-logo.png"
                  alt=""
                  marginLeft={'auto'}
                  marginRight={'40px'}
                />
              </Box>
              <Box>
                <Text lineHeight={1} textAlign={'left'} fontSize={'24px'} fontWeight={600} mb={4}>
                  Axoft
                </Text>
                <Text mb={3}>
                  Глобальный эксперт в области дистрибуции информационных технологий и сервисов.
                  Axoft — точка притяжения лучших технологических практик и сервисов, аналитической
                  и технической экспертизы для вендоров, партнеров, бизнеса, государства и
                  экспертного сообщества.
                </Text>
                <Link href="https://axoftglobal.ru/" isExternal>
                  www.axoftglobal.ru
                </Link>
              </Box>
            </Stack>
          </ListItem>
        </List>
      </Box>
    </Container>
  )
}

export default PartnersPage
