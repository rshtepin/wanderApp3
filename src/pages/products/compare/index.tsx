import { BlitzPage, useParam, useParams, useRouterQuery } from '@blitzjs/next'
import { Wrap } from '@chakra-ui/react'
import { Suspense } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import Layout from 'src/core/layouts/Layout'
import getProduct from 'src/products/queries/getProduct'
import { useQuery } from '@blitzjs/rpc'

const CompareTable: any = () => {
  let newarr: number = []
  let dataarr = []
  const id = useRouterQuery()
  console.log(JSON.stringify(id))
  const arr = JSON.parse(JSON.stringify(id))
  arr.id.map((item) => newarr.push(item))

  const [CompareProducts] = useQuery(getProduct, { id: 1 })
  console.log(CompareProducts)
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric></Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

const CompareProducts: BlitzPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CompareTable />
      </Suspense>
    </>
  )
}
CompareProducts.getLayout = (page) => <Layout>{page}</Layout>
export default CompareProducts
