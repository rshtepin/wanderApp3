import { Suspense } from 'react'
import { Routes } from '@blitzjs/next'
import Head from 'next/head'
import Link from 'next/link'
import { usePaginatedQuery } from '@blitzjs/rpc'
import { useRouter } from 'next/router'
import Layout from 'src/core/layouts/Layout'
import getTestings from 'src/testings/queries/getTestings'

const ITEMS_PER_PAGE = 100

export const TestingsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ testings, hasMore }] = usePaginatedQuery(getTestings, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {testings.map((testing) => (
          <li key={testing.id}>
            <Link href={Routes.ShowTestingPage({ testingId: testing.id })}>
              <button>{testing.name}</button>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TestingsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Testings</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTestingPage()}>Create Testing</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TestingsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TestingsPage
