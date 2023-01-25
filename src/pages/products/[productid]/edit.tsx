import { Suspense } from 'react'
import Head from 'next/head'
import { useQuery, usePaginatedQuery, useMutation } from '@blitzjs/rpc'
import { useParam } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import getProduct from 'src/products/queries/getProduct'
import getAllFields from 'src/products/template-editor/queries/getAllFields'
import { ProductPropEditField } from 'src/products/components/ProductPropEditField'
import addUpdateFieldValue from 'src/products/mutations/addUpdateFieldValue'

export const Product = () => {
  const [addUpdateProductFieldMutation] = useMutation(addUpdateFieldValue)
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
    let result = Product.Variable_value.filter((item) => item.id_variable === id_variable)
    if (result.length > 0) {
      res = result[0].value
    }
    return res
  }

  return (
    <>
      <Head>
        <title>{Product.title}</title>
      </Head>
      <div className="product-main-body">
        <div className="content-product-container">
          <div className="header-product-container">
            <div className="one-product-page-header">{Product.title}</div>
            <div className="one-product-page-subtitle">
              Специализированное программное обеспечение, предназначенное для защиты компании от
              утечек информации от компании InfoWatch
            </div>
          </div>
          <div className="description-block">
            <div className="table-product-props-container">
              <div className="description-part-title">Тип системы</div>
              {fields.map((item) => (
                <ProductPropEditField
                  key={item.id}
                  product={Product}
                  field={item}
                  value={getValue(item.id)}
                  save={addUpdateProductFieldMutation}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const EditProductPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Product />
    </Suspense>
  )
}

EditProductPage.authenticate = true
EditProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProductPage
