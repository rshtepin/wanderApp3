import { BlitzPage, useRouterQuery } from '@blitzjs/next'
import { Center, Container, Img, Spinner, Tfoot } from '@chakra-ui/react'
import { Suspense, useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'
import Layout from 'src/core/layouts/Layout'
import { usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import getProducts from 'src/products/queries/getProducts'
import getAllGroupFields from 'src/products/template-editor/groupseditor/queries/getAllGroupFields'
import getAllFields from 'src/products/template-editor/queries/_getAllFields'
import next from 'next'

const CompareTable: any = () => {
  const [FieldGroups, setFieldGroups] = useState<any>([])
  let { id } = useRouterQuery()
  if (typeof id !== 'undefined') id = id.map(Number)

  const [{ products, hasMore }] = usePaginatedQuery(getProducts, {
    where: { id: { in: id } },
    orderBy: {},
  })
  let productsArr = []
  id.map((i) => products.map((item) => item.id == i && productsArr.push(item)))

  const [{ fields }] = usePaginatedQuery(getAllFields, {
    orderBy: { order: 'asc' },
    skip: 0,
    take: 100,
  })
  const [{ groups }] = usePaginatedQuery(getAllGroupFields, {
    orderBy: { order: 'asc' },
    skip: 0,
    take: 100,
  })

  const getValue = (id_variable, product) => {
    let res = ''
    let result = product.Variable_value.filter((item) => item.id_variable === id_variable)
    if (result.length > 0) {
      res = result[0].value
    }
    return res
  }

  useEffect(() => {
    let mystate: any = []
    groups.map((itemG: any) => {
      const sameFields: any = []
      const differentFields: any = []
      fields.map((itemF) => {
        if (itemF.id_group == itemG.id) {
          const res = products.every((i) => {
            if (getValue(itemF.id, i) !== getValue(itemF.id, products[0])) return false
            else return true
          })
          if (res) sameFields.push(itemF)
          else differentFields.push(itemF)
        }
      })
      mystate.push({ ...itemG, differentFields: differentFields, samefields: sameFields })
    })
    setFieldGroups(mystate)
  }, [])

  return (
    <TableContainer>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th></Th>
            {productsArr.map((item: any) => (
              <Th key={item.title} align="center" textAlign="center">
                <Center>
                  <Img
                    height="20px"
                    src={
                      process.env.NEXT_PUBLIC_APP_URL! +
                      process.env.NEXT_PUBLIC_PRODUCT_LOGODIR! +
                      item.logo
                    }
                    alt={'Logo ' + item.title}
                  />
                </Center>
                {item.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        {FieldGroups.map(
          (group) =>
            group.id !== 1 && (
              <>
                <Thead fontWeight="600" key={group.name}>
                  {group.name}
                </Thead>
                <Tbody>
                  {group.samefields.map((field) => (
                    <Tr key={field.name}>
                      <Td color="green">{field.name}</Td>
                      {productsArr.map((product) => (
                        <Td key={product.id} textAlign="center">
                          {getValue(field.id, product)}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                  {group.differentFields.map((field) => (
                    <>
                      <Tr key={field.name}>
                        <Td color="red">{field.name}</Td>
                        {productsArr.map((product) => (
                          <Td key={product.id} textAlign="center">
                            {getValue(field.id, product)}
                          </Td>
                        ))}
                      </Tr>
                    </>
                  ))}
                </Tbody>
              </>
            )
        )}
      </Table>
    </TableContainer>
  )
}

const CompareProducts: BlitzPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Center height={'100vh'}>
            <Spinner
              thickness="4px"
              speed="0.45s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        }
      >
        <Container maxW="3xl" centerContent>
          <CompareTable />
        </Container>
      </Suspense>
    </>
  )
}
CompareProducts.getLayout = (page) => <Layout>{page}</Layout>
export default CompareProducts
