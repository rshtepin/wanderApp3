import { BlitzPage, useRouterQuery } from '@blitzjs/next'

import { Box, Center, Container, Img } from '@chakra-ui/react'
import { Suspense, useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'
import Layout from 'src/core/layouts/Layout'
import { usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import getProducts from 'src/products/queries/getProducts'
import getAllGroupFields from 'src/products/template-editor/groupseditor/queries/getAllGroupFields'
import getAllFields from 'src/products/template-editor/queries/getAllFields'

const CompareTable: any = () => {
  const [fieldGroups, setFieldGroups] = useState<any>([])
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
    let mystate = []
    groups.map((itemG: any) => {
      const addFileds = []
      fields.map((itemF) => {
        itemF.id_group == itemG.id ? addFileds.push(itemF) : next
      })
      mystate.push({ ...itemG, fields: addFileds })
    })
    setFieldGroups(mystate)
  }, [])
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="green" size="sm">
        <Thead>
          <Tr>
            <Th></Th>
            {productsArr.map((item: any) => (
              <Th key={item.id} align="center" textAlign="center">
                <Center>
                  <Img
                    height="15px"
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
        {fieldGroups.map(
          (group) =>
            group.id !== 1 && (
              <>
                <Thead key={group.id} fontWeight="600">
                  {group.name}
                </Thead>
                <Tbody>
                  {group.fields.map((field) => (
                    <>
                      <Tr key={field.id}>
                        <Td>{field.name}</Td>
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
      <Suspense fallback={<div>Loading...</div>}>
        <Container maxW="3xl" centerContent>
          <CompareTable />
        </Container>
      </Suspense>
    </>
  )
}
CompareProducts.getLayout = (page) => <Layout>{page}</Layout>
export default CompareProducts
