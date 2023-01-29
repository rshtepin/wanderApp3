import { Suspense } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery, useMutation, usePaginatedQuery } from '@blitzjs/rpc'
import { useParam } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import getProduct from 'src/products/queries/getProduct'
import getAllFields from 'src/products/template-editor/queries/getAllFields'
import { ProductPropField } from 'src/products/components/ProductPropField'
import { Image } from '@chakra-ui/react'

export const Product = () => {
  const productId = useParam('productId', 'number')
  const [Product] = useQuery(getProduct, { id: productId })
  //console.log(Product)
  const [{ fields, hasMore }] = usePaginatedQuery(getAllFields, {
    orderBy: { order: 'asc' },
    skip: 0,
    take: 100,
  })
  const getValue = (id_variable) => {
    let res = ''
    var result = Product.Variable_value.filter(function (item) {
      return item.id_variable === id_variable
    })
    if (result.length > 0) {
      res = result[0].value
    }
    return res
  }
  console.log(getValue())
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
              src={
                process.env.NEXT_PUBLIC_APP_URL +
                process.env.NEXT_PUBLIC_PRODUCT_LOGODIR +
                Product.logo
              }
              alt={'Logo ' + Product.title}
            />
            <div className="one-product-page-header">{Product.title}</div>
            <div className="one-product-page-subtitle">{Product.shortdesc}</div>
          </div>
          <div className="description-block">
            <div className="table-product-props-container">
              <div className="description-part-title">Тип системы</div>
              {fields.map((item) => (
                <ProductPropField key={item.id} field={item} value={getValue(item.id)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const ShowProductPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Product />
      </Suspense>
    </>
  )
}

ShowProductPage.authenticate = true
ShowProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProductPage
