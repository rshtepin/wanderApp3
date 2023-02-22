import React from 'react'
import { Box, Flex, HStack, Link, Image } from '@chakra-ui/react'

const Links = [
  { title: 'Услуги', href: 'services' },
  { title: 'Компания', href: 'company' },
  { title: 'Партнеры', href: 'partners' },
  { title: 'Проекты', href: '../products/editor/' },
]

const NavLink = ({ children, links }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: '#003d00',
    }}
    href={links}
  >
    {children}
  </Link>
)

const HomeHeader = () => {
  const Logo = 'media/images/landing/dw-03.svg'
  return (
    <>
      <Box px={4} bg={'#001d00'} color="white" mb={50} position={'sticky'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Image src={Logo} h={7} alt="DW" />

          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.href} links={link.href}>
                {link.title}
              </NavLink>
            ))}
          </HStack>
        </Flex>
      </Box>
    </>
  )
}

export default HomeHeader
