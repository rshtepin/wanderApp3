import React, { Suspense, useState } from 'react'
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
import { IProduct, IProductTypes } from 'src/types'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

interface ProductItemCardProps {
  product: IProduct
  onDelete: ({ product }) => void
  compare: ({ product, flag }) => void
}

const AdminBlock: any = ({ product, onDelete }: ProductItemCardProps) => {
  const session = useSession()
  const role = session.role

  if (role == 'ADMIN')
    return (
      <>
        <Grid mt={1} templateColumns="repeat(5, 1fr)" gap={1}>
          <GridItem>
            <Link href={Routes.EditProductPage({ productId: product.id })}>
              <Button mr={1} colorScheme="yellow">
                Редактировать
              </Button>
            </Link>
          </GridItem>
          <GridItem>
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

const ProductItemCard = ({ product, onDelete, compare }: ProductItemCardProps) => {
  const [flag, setFlag] = useState(false)

  const toCompare = () => {
    {
      compare({ product: product, flag: !flag })
      setFlag(!flag)
    }
  }
  return (
    <div className="card-container">
      <div className="card-text-container">
        <div className="card-title">
          <Stack>
            <Link href={Routes.ShowProductPage({ productId: product.id.toString() })}>
              <Image
                height="20px"
                objectFit="cover"
                src={process.env.NEXT_PUBLIC_PRODUCT_LOGODIR! + product.logo}
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

      <Box
        className="card-buttons"
        height="30px"
        width={!flag ? '90px' : '115px'}
        borderRadius="3px"
        border={!flag ? '1px' : '0px'}
        color="#001D00"
        borderColor={'#CCCCCC'}
        transition="all 0.1s cubic-bezier(.08,.52,.52,1)"
        _hover={{ bg: '#B2A1FF' }}
        bg={!flag ? '#f2f2f2f0' : '#B2A1FF'}
        onClick={toCompare}
      >
        {flag ? 'В Сравнении' : 'Сравнить'}
      </Box>
      <Suspense fallback="Проверяем права...">
        <AdminBlock onDelete={onDelete} product={product} />
      </Suspense>
    </div>
  )
}

export default ProductItemCard
