import { Suspense, useState } from 'react'
import {
  Button,
  Card,
  Checkbox,
  Heading,
  CardBody,
  CardHeader,
  Image,
  Box,
  Stack,
  Text,
  Grid,
  GridItem,
  useBoolean,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Routes } from '@blitzjs/next'
import { useSession } from '@blitzjs/auth'

const AdminBlock = (prop) => {
  const { product, onDelete, checked } = prop
  const session = useSession()
  const role = session.role

  if (role == 'ADMIN')
    return (
      <>
        <Grid mt={2} templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <Link href={Routes.EditProductPage({ productId: product.id })}>
              <Button mr={2} colorScheme="yellow">
                Редактировать
              </Button>
            </Link>
          </GridItem>
          <GridItem colStart={4} colEnd={6}>
            <Button
              colorScheme="red"
              onClick={() => {
                if (confirm('Удалить продукт ' + product.title + ' ?')) onDelete({ id: product.id })
              }}
            >
              Удалить
            </Button>
          </GridItem>
        </Grid>
      </>
    )
}
///////////////////

const ProductItem = ({ product, onDelete }) => {
  const [flag, setFlag] = useBoolean()
  const [checked, setChecked] = useState(false)
  return (
    <div className="card-container">
      <div className="card-text-container">
        <div className="card-title">
          <Stack>
            <Link href={Routes.ShowProductPage({ productId: product.id })}>
              <Image
                height="20px"
                objectFit="cover"
                src={
                  process.env.NEXT_PUBLIC_APP_URL +
                  process.env.NEXT_PUBLIC_PRODUCT_LOGODIR +
                  product.logo
                }
                alt={'Logo ' + product.title}
              />
              <Heading>{product.title}</Heading>
            </Link>
          </Stack>
        </div>
        <div className="card-description">
          <Stack>
            <Link href={Routes.ShowProductPage({ productId: product.id })}>
              <Text noOfLines={6}>{product.longdesc}</Text>
            </Link>
          </Stack>
        </div>
      </div>
      <div className="card-buttons">
        <Box
          defaultChecked
          _selected={{
            width: '110px',
            bg: '#B2A1FF',
            border: '0px',
          }}
          font-weight="400"
          line-height="17px"
          height="30px"
          width="90px"
          borderColor="#CCCCCC"
          borderRadius="3px"
          border="1px"
          color="#001D00"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          _hover={{ bg: '#999999' }}
          _active={{
            width: '110px',
            bg: '#B2A1FF',
            border: '0px',
          }}
          _focus={{
            boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
          }}
          onClick={setFlag.toggle}
        >
          {flag ? 'В Сравнении' : 'Сравнить'}
        </Box>
        <Suspense fallback="Проверяем права...">
          <AdminBlock onDelete={onDelete} product={product} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductItem
