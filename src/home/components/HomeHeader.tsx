import React, { Suspense } from 'react'
import { Box, Flex, Link, Image, Button } from '@chakra-ui/react'
import { useSession } from '@blitzjs/auth'
import { useMutation } from '@blitzjs/rpc'
import logout from 'src/auth/mutations/logout'
import Layout from 'src/core/layouts/Layout'

const HomeHeader = () => {
  const session = useSession({ suspense: false })
  const [logoutMutation] = useMutation(logout)
  const Logo = '/media/images/landing/dw-03.svg'

  const Links = [
    { title: 'Услуги', href: '/home/#services' },
    { title: 'Компания', href: '/home/#company' },
    { title: 'Партнеры', href: '/partners' },
    //   { title: 'Продукты', href: '/products' },
  ]
  //{ title: 'Редактор', href: '../products/editor/' },
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

  return (
    <Box color="white" mb={10} w={'100%'}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Link href="/">
          <Image src={Logo} h={6} alt="DW" />
        </Link>
        <Box>
          {Links.map((link) => (
            <NavLink key={link.href} links={link.href}>
              {link.title}
            </NavLink>
          ))}

          {session.userId && (
            <Layout>
              {/* <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: '#003d00',
                }}
                href={'/products'}
              >
                Продукты
              </Link> */}
              {session.role === 'ADMIN' && (
                <Link
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: '#003d00',
                  }}
                  href={'/products/editor'}
                >
                  Редактор
                </Link>
              )}
              <Button
                h={'24px'}
                colorScheme="red"
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: '#003d00',
                }}
                onClick={() => logoutMutation()}
              >
                Выйти
              </Button>
            </Layout>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default HomeHeader
