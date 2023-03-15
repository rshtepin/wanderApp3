import React, { Suspense, useState } from 'react'
import { Button, Heading, Image, Box, Stack, Text, Grid, GridItem } from '@chakra-ui/react'
import Link from 'next/link'
import { Routes } from '@blitzjs/next'
import { useSession } from '@blitzjs/auth'
import { IProduct, IProductTypes } from 'src/types'

interface ProductItemCardProps {
  product: IProduct
  onDelete: (product: IProduct) => void
  compare: (product: IProduct, flag: boolean) => void
}

const AdminBlock: any = ({ product, onDelete }: ProductItemCardProps) => {
  const session = useSession()
  const role = session.role

  if (role == 'ADMIN')
    return (
      <>
        <Grid mt={1} templateColumns="repeat(5, 1fr)" gap={1}>
          <GridItem>
            <Link href={Routes.EditProductPage({ productId: product.id! })}>
              <Button mr={1} colorScheme="yellow">
                Редактировать
              </Button>
            </Link>
          </GridItem>
          <GridItem>
            <Button
              colorScheme="red"
              onClick={() => {
                if (confirm('Удалить продукт ' + product.title + ' ?')) onDelete(product)
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
  const [flag, setFlag] = useState(product.isCompare)

  const toCompare = () => {
    {
      compare(product, !flag)
      setFlag(!flag)
    }
  }

  return (
    <div className="card-container">
      <div className="card-text-container">
        <div className="card-title">
          <Link href={Routes.ShowProductPage({ productId: product.id! })}>
            <Image
              height="20px"
              objectFit="cover"
              src={process.env.NEXT_PUBLIC_PRODUCT_LOGODIR! + product.logo}
              alt={''}
            />
            <Heading>{product.title}</Heading>
            {product.isCompare}
          </Link>
        </div>
        <div className="card-description">
          <Link href={Routes.ShowProductPage({ productId: product.id! })}>
            <Text noOfLines={6}>{product.longdesc}</Text>
          </Link>
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
