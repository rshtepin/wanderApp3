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
        <Button mr={2} colorScheme="yellow">
          Редактировать
        </Button>
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
    <div className="card-container ">
      <div className="card-text-container">
        <div>
          <div className="card-title">
            <Stack>
              <Heading>{product.title}</Heading>
            </Stack>
          </div>
          <div className="card-description">
            <Stack>
              <Text>
                DLP-система нового поколения с искусственным интеллектом. Защищает данные
                организации от утечек и обеспечивает соответствие требованиям регуляторов. InfoWatch
                Traffic Monitor предотвращает передачу конфиденциальной информации за пределы
                информационных систем организации, помогает определять риски, занимается
                профилактикой инцидентов ИБ и контролирует рабочую активность сотрудников.
              </Text>
            </Stack>
          </div>

          <div>
            <Checkbox size="lg" mr={180} colorScheme="green" defaultChecked>
              Сравнить
            </Checkbox>
            <Suspense fallback="Проверяем права...">
              <AdminBlock onDelete={onDelete} product={product} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
