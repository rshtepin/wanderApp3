import { Suspense, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery, useMutation, usePaginatedQuery } from '@blitzjs/rpc'
import { useParam } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import getProduct from 'src/products/queries/getProduct'
import getAllFields from 'src/products/queries/getAllFields'
import { ProductPropField } from 'src/products/components/ProductPropField'
import { Box, Center, Image } from '@chakra-ui/react'
import { usePagination } from 'src/core/hooks/usePagination'
import getAllGroupFields from 'src/products/queries/getProductGroups'
import { BlitzPage } from '@blitzjs/auth'
import { IProductFields, IProductFieldValues, IProductGroups } from 'src/types'
import HomeHeader from 'src/home/components/HomeHeader'

export const Product = () => {
  const [fieldGroups, setFieldGroups] = useState<IProductGroups[]>([])
  const productId = useParam('productId', 'number')
  const [Product] = useQuery(getProduct, { id: productId })
  const pagination = usePagination()
  const [{ fields, hasMore }] = usePaginatedQuery(getAllFields, {
    orderBy: { order: 'asc' },
    skip: 0 * pagination.page,
    take: 100,
  })
  const [{ groups }] = usePaginatedQuery(getAllGroupFields, {
    orderBy: { order: 'asc' },
    skip: 0 * pagination.page,
    take: 100,
  })

  useEffect(() => {
    let mystate: IProductGroups[] = []
    groups.map((itemG: any) => {
      const addFileds: IProductFields[] = []
      fields.map((itemF: IProductFields) => {
        itemF.id_group == itemG.id ? addFileds.push(itemF) : {}
      })
      mystate.push({ ...itemG, field: addFileds })
    })
    setFieldGroups(mystate)
  }, [])

  const getValue = (id_variable) => {
    if (Product) {
      let res: string = ''

      const result: any = Product?.Variable_value?.filter((item: any) => {
        return item.id_variable === id_variable
      })
      if (result!.length > 0) {
        res = result![0]!.value!
      }
      return res
    }
  }

  return (
    <>
      <Head>
        <title>{Product.title}</title>
      </Head>
      <div className="product-main-body">
        <div className="content-product-container">
          <div className="header-product-container">
            <Image
              height="50px"
              objectFit="cover"
              src={process!.env.NEXT_PUBLIC_PRODUCT_LOGODIR! + Product.logo}
              alt={'Logo ' + Product.title}
            />
            <div className="one-product-page-header">{Product.title}</div>
            <div className="one-product-page-subtitle">{Product.shortdesc}</div>
          </div>
          <div className="description-block">
            {fieldGroups.map((group: IProductGroups) => (
              <div key={group.id} className="table-product-props-container">
                <div className="description-part-title">{group.title}</div>
                <Center w={'100%'}>
                  <Box width={'98%'}>
                    <ul className="product-desription-field">
                      {group.field!.map((item: IProductFields) => (
                        <ProductPropField key={item.id} field={item} value={getValue(item.id)} />
                      ))}
                    </ul>
                  </Box>
                </Center>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const ShowProductPage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Center>
          <Box width={'1200px'}>
            <HomeHeader />
          </Box>
        </Center>
        <Product />
      </Suspense>
    </>
  )
}

// .ShowProductPage.authenticate = true
ShowProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProductPage
