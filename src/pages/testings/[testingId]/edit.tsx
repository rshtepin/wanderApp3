import { Suspense } from 'react'
import { Routes } from '@blitzjs/next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@blitzjs/rpc'
import { useParam } from '@blitzjs/next'

import Layout from 'src/core/layouts/Layout'
import getTesting from 'src/testings/queries/getTesting'
import updateTesting from 'src/testings/mutations/updateTesting'
import { TestingForm, FORM_ERROR } from 'src/testings/components/TestingForm'

const EditTestingPage = () => {
  const productId = useParam('productId', 'number')
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>scd</Suspense>

      <p></p>
    </div>
  )
}

EditTestingPage.authenticate = true
EditTestingPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTestingPage
