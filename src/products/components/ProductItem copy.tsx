import { Suspense, useState } from 'react'
import { Button, Card, Checkbox, Heading, CardBody, CardHeader, Image } from '@chakra-ui/react'
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
        <Button colorScheme="yellow">Редактировать</Button>
        <Button colorScheme="red" onClick={() => onDelete({ id: product.id })}>
          Удалить
        </Button>
      </>
    )
}
///////////////////

const ProductItem = ({ product, onDelete }) => {
  const [checked, setChecked] = useState(false)
  return (
    <Card>
      <Image
        boxSize="100px"
        src="https://w7.pngwing.com/pngs/464/554/png-transparent-account-avatar-profile-user-avatars-icon.png"
        alt={product.title}
      />
      <CardBody>
        <CardHeader>
          <Heading>{product.title}</Heading>
        </CardHeader>

        <Link href={Routes.ShowProductPage({ productId: product.id })}>
          <Button colorScheme="blue">Посмотреть</Button>
        </Link>
        <Suspense fallback="Проверяем права...">
          <AdminBlock onDelete={onDelete} product={product} />
        </Suspense>
        <br />
        <Checkbox
          value={''}
          id={product.id}
          isChecked={checked}
          onChange={() => setChecked(!checked)}
        >
          Сравнить
        </Checkbox>
        <br />
      </CardBody>
    </Card>
  )
}

export default ProductItem
