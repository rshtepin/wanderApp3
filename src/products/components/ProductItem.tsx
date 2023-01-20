import { useState } from 'react'
import { Button, Card, Checkbox, Heading, CardBody, CardHeader, Image } from '@chakra-ui/react'

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
        <Button colorScheme="blue">Посмотреть</Button>
        <Button colorScheme="yellow">Редактировать</Button>
        <Button colorScheme="red" onClick={() => onDelete(product.id)}>
          Удалить
        </Button>
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
