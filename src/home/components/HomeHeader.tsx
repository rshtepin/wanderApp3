import React from 'react'
import { Box, Flex, HStack, Link, Image } from '@chakra-ui/react'
import useDeviceSize from '../helpers/useDeviceSize'

const Links = [
  { title: 'Услуги', href: '/#services' },
  { title: 'Компания', href: '/#company' },
  { title: 'Партнеры', href: '/partners' },
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
  const [width, height] = useDeviceSize()
  const Logo = '/media/images/landing/dw-03.svg'
  return (
    <>
      <Box color="white" mb={10}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Image src={Logo} h={6} alt="DW" />

          <Box>
            {Links.map((link) => (
              <NavLink key={link.href} links={link.href}>
                {link.title}
              </NavLink>
            ))}
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default HomeHeader
