import { Suspense } from 'react'
import { Routes } from '@blitzjs/next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@blitzjs/rpc'
import { useParam } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import getProduct from 'src/products/queries/getProduct'
import cn from 'classnames'
import styles from '../../styles/ParticalCode.module.scss'
export const Product = () => {
  const router = useRouter()
  const productId = useParam('productId', 'number')
  console.log('productId: ' + productId)
  const [Product] = useQuery(getProduct, { id: productId })

  return (
    <>
      <Head>
        <title>Product {Product.title}</title>
      </Head>
      {Product.title}
    </>
  )
}

const ShowProductPage = () => {
  return (
    <div>
      <p></p>

      <Suspense fallback={<div>Loading...</div>}>
        <Product />
      </Suspense>
    </div>
  )
}

ShowProductPage.authenticate = true
ShowProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProductPage
