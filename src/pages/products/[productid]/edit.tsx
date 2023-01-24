import { Suspense } from 'react'
import { Routes } from '@blitzjs/next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@blitzjs/rpc'
import { useParam } from '@blitzjs/next'

import Layout from 'src/core/layouts/Layout'
import getProduct from 'src/Products/queries/getProduct'
import updateProduct from 'src/Products/mutations/updateProduct'
import { ProductForm, FORM_ERROR } from 'src/Products/components/ProductForm'

const EditProductPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>scd</Suspense>

      <p></p>
    </div>
  )
}

EditProductPage.authenticate = true
EditProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProductPage
