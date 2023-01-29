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
} from '@chakra-ui/react'
import Link from 'next/link'
import { Routes } from '@blitzjs/next'
import { useSession } from '@blitzjs/auth'

const AdminBlock = (prop) => {
  const { product, onDelete } = prop
  const session = useSession()
  const role = session.role

  if (role == 'ADMIN')
    return (
      <>
        <Link href={Routes.EditProductPage({ productId: product.id })}>
          <Button mr={2} colorScheme="yellow">
            Редактировать
          </Button>
        </Link>
        <Button
          colorScheme="red"
          onClick={() => {
            if (confirm('Удалить продукт ' + product.title + ' ?')) onDelete({ id: product.id })
          }}
        >
          Удалить
        </Button>
      </>
    )
}
///////////////////

const ProductItem = ({ product, onDelete }) => {
  const [checked, setChecked] = useState(false)
  return (
    <div className="card-container">
      <div className="card-text-container">
        <div className="card-title">
          <Stack>
            <Link href={Routes.ShowProductPage({ productId: product.id })}>
              <Image
                height="30px"
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
        <Checkbox size="lg" mr={180} colorScheme="green" defaultChecked={false}>
          Сравнить
        </Checkbox>
        <Suspense fallback="Проверяем права...">
          <AdminBlock onDelete={onDelete} product={product} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductItem
