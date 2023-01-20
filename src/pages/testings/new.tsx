import { Routes } from '@blitzjs/next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from '@blitzjs/rpc'
import Layout from 'src/core/layouts/Layout'
import createTesting from 'src/testings/mutations/createTesting'
import { TestingForm, FORM_ERROR } from 'src/testings/components/TestingForm'

const NewTestingPage = () => {
  const router = useRouter()
  const [createTestingMutation] = useMutation(createTesting)

  return (
    <Layout title={'Create New Testing'}>
      <h1>Create New Testing</h1>

      <TestingForm
        submitText="Create Testing"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTesting}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const testing = await createTestingMutation(values)
            await router.push(Routes.ShowTestingPage({ testingId: testing.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TestingsPage()}>
          <a>Testings</a>
        </Link>
      </p>
    </Layout>
  )
}

NewTestingPage.authenticate = true

export default NewTestingPage
