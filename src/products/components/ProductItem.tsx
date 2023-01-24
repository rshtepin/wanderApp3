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
    <div className="card-container ">
      <div className="card-text-container">
        <div className="card-title">{product.title}</div>
        <div className="card-description">
          DLP-система нового поколения с искусственным интеллектом. Защищает данные организации от
          утечек и обеспечивает соответствие требованиям регуляторов. InfoWatch Traffic Monitor
          предотвращает передачу конфиденциальной информации за пределы информационных систем
          организации, помогает определять риски, занимается профилактикой инцидентов ИБ и
          контролирует рабочую активность сотрудников.
        </div>
      </div>
      <div className="card-button">Сравнить</div>
    </div>
  )
}

export default ProductItem
