import { Suspense } from 'react'
import { Routes } from '@blitzjs/next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@blitzjs/rpc'
import { useParam } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import getTesting from 'src/testings/queries/getTesting'
import deleteTesting from 'src/testings/mutations/deleteTesting'

export const Testing = () => {
  const router = useRouter()
  const testingId = useParam('testingId', 'number')
  console.log(testingId)
  const [deleteTestingMutation] = useMutation(deleteTesting)
  const [testing] = useQuery(getTesting, { id: testingId })

  return (
    <>
      <Head>
        <title>Testing {testing.id}</title>
      </Head>

      <div>
        <h1>Testing {testing.id}</h1>
        <pre>{JSON.stringify(testing, null, 2)}</pre>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm('This will be deleted')) {
              await deleteTestingMutation({ id: testing.id })
              await router.push(Routes.TestingsPage())
            }
          }}
          style={{ marginLeft: '0.5rem' }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowTestingPage = () => {
  return (
    <div>
      <p></p>

      <Suspense fallback={<div>Loading...</div>}>
        <Testing />
      </Suspense>
    </div>
  )
}

ShowTestingPage.authenticate = true
ShowTestingPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTestingPage
