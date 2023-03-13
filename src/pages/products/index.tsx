import { BlitzPage } from '@blitzjs/next'
import { useMutation, usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { AllProducts } from 'src/products/components/AllProducts'
import {
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react'
import getTypes from 'src/products/queries/getTypes'
import getProducts from 'src/products/queries/getProducts'
import { usePagination } from 'src/core/hooks/usePagination'
import { Suspense, useEffect, useState } from 'react'
import { IProduct, IProductTypes } from 'src/types'
import ModalAddProductProp from 'src/products/components/ModalAddProductProp'
import { useSession } from '@blitzjs/auth'
import addUpdateProduct from 'src/products/mutations/addUpdateProduct'
import HomeHeader from 'src/home/components/HomeHeader'
import ProductTypesMenu from 'src/products/components/ProductTypesMenu'

// Блок администратора

const ProductsPage: BlitzPage = () => {
  const ITEMS_PER_PAGE = 30

  const pagination = usePagination()
  const [{ types }] = useQuery(getTypes, {})

  const [{ products }] = usePaginatedQuery(getProducts, {
    orderBy: { order: 'asc' },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })
  let allProducts: any = products
  const [currentTab, SetCurrnetTab] = useState<IProductTypes>(types[0]!)
  const [currentProducts, SetCurrnetProducts] = useState<IProduct[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [compareProducts, setCompareProducts] = useState<Object>({})

  const handleClick = () => {
    onOpen()
  }

  useEffect(() => {
    allProducts = []
    products.map((product) => allProducts.push({ ...product, isCompare: false }))

    let json: Object = {}
    types.map((i) => {
      json[i.id.toString()] = []
    })
    setCompareProducts(json)
  }, [])

  const AdminBlock: any = () => {
    const session = useSession()
    const role = session.role
    const [show, setShow] = useState(false)
    const [addProductMutation] = useMutation(addUpdateProduct)
    if (role == 'ADMIN') {
      const onHide = () => {
        setShow(false)
      }

      const onClose = () => {
        setShow(false)
      }
      const onSave = async (newProduct: IProduct) => {
        console.log('newProduct')
        console.log(newProduct)
        await addProductMutation({
          title: newProduct.title,
          typeId: newProduct.typeId,
          id: -1,
        })
      }

      return (
        <>
          <Box mt={5}>
            <Button mr={2} mt={2} colorScheme="messenger" onClick={() => setShow(true)}>
              Добавить продукт
            </Button>
            <ModalAddProductProp
              show={show}
              onHide={onHide}
              onClose={onClose}
              onSave={onSave}
              types={types}
            />
          </Box>
        </>
      )
    }
  }

  const CompareBlock = () => {
    return (
      <Drawer onClose={onClose} isOpen={isOpen} size={'full'}>
        <DrawerOverlay />
        <DrawerContent bg={'#001d00'}>
          <DrawerCloseButton />
          <DrawerHeader>HEADER</DrawerHeader>
          <DrawerBody>
            <p>{JSON.stringify(compareProducts[currentTab.id.toString()])}</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    )
  }

  useEffect(() => {
    let prodArr: any = []
    allProducts.map((product) => {
      product.typeId === currentTab.id && prodArr.push(product)
    })
    return SetCurrnetProducts(prodArr)
  }, [currentTab, products])

  const tabsChange = async (type: IProductTypes) => {
    console.log(type.title)
    await SetCurrnetTab(type)
  }
  const onDelete = (product: IProduct) => {
    console.log(product)
  }

  const compare = (product: IProduct, flag: boolean) => {
    if (flag) {
      console.log(allProducts)

      let json = compareProducts
      json[product.typeId.toString()].push(product)
      setCompareProducts(json)
    } else {
      let json = compareProducts
      let array = json[product.typeId.toString()]
      json[product.typeId.toString()] = array.filter((i) => i !== product)
      setCompareProducts(json)
    }
  }

  console.log(compareProducts)
  return (
    <Center>
      <Box w={'75%'} maxW={'1200px'}>
        <Suspense>
          <HomeHeader />
        </Suspense>
        <Button onClick={() => handleClick()} m={4} color={'black'}>
          Сравнить
        </Button>
        <CompareBlock />
        <ProductTypesMenu type={types} onChange={tabsChange} />
        <Divider mb={4} />

        <Wrap spacing={'2em'} justify={'center'}>
          <AllProducts
            product={currentProducts}
            type={currentTab}
            onDelete={onDelete}
            compare={compare}
          />
        </Wrap>

        <AdminBlock />
      </Box>
    </Center>
  )
}

//ProductsPage.authenticate = { redirectTo: Routes.LoginP() }

export default ProductsPage
