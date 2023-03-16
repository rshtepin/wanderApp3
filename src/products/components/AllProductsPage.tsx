import React from 'react'
import { useEffect, useState } from 'react'
import { useSession } from '@blitzjs/auth'
import { useMutation, usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { usePagination } from 'src/core/hooks/usePagination'

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
  Img,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react'

import getTypes from 'src/products/queries/getTypes'
import getProducts from 'src/products/queries/getProducts'
import getAllGroupFields from 'src/products/queries/getProductGroups'
import getAllFields from 'src/products/queries/getAllFields'

import addUpdateProduct from 'src/products/mutations/addUpdateProduct'

import { AllProducts } from 'src/products/components/AllProducts'
import ProductTypesMenu from 'src/products/components/ProductTypesMenu'
import ModalAddProductProp from 'src/products/components/ModalAddProductProp'

import { IJSONProduct, IProduct, IProductGroups, IProductTypes } from 'src/types'
import allDataParser from 'src/home/helpers/allDataParser'
import differentDataParser from 'src/home/helpers/differentDataParser'

const AllProductsPage = () => {
  const ITEMS_PER_PAGE = 30

  const pagination = usePagination()
  const [{ types }] = useQuery(getTypes, {})

  const [{ products }]: any = usePaginatedQuery(getProducts, {
    orderBy: { order: 'asc' },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  const [{ groups }] = usePaginatedQuery(getAllGroupFields, {
    orderBy: { order: 'asc' },
    skip: 0 * pagination.page,
    take: 100,
  })

  const [{ fields, hasMore }] = usePaginatedQuery(
    getAllFields,
    {
      orderBy: { order: 'asc' },
      skip: 0,
      take: 100,
    },
    {}
  )
  const session = useSession()
  const role = session.role
  const [addProductMutation] = useMutation(addUpdateProduct)

  const [allProducts, setAllProducts] = useState<IJSONProduct[]>(() =>
    allDataParser(products, groups, fields)
  )

  const [currentTab, setCurrnetTab] = useState<IProductTypes>(types[0]!)
  const [currentProducts, setCurrnetProducts] = useState<IJSONProduct[]>([])
  const [compareProducts, setCompareProducts] = useState<IJSONProduct[]>([])
  const [compareDisabled, setCompareDisabled] = useState<boolean>(true)
  const [show, setShow] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    onOpen()
  }

  const getValue = (id_variable, Product: IJSONProduct) => {
    const result: any = Product.Variable_value!.filter(
      (item: any) => item.id_variable === id_variable
    )
    if (result.length > 0) return result![0]!.value!
  }

  useEffect(() => {
    let json: IJSONProduct[] = []
    types.map((i) => {
      json[i.id.toString()] = []
    })
    setCompareProducts(json)
  }, [])

  const AdminBlock: any = () => {
    if (role == 'ADMIN') {
      const onHide = () => {
        setShow(false)
      }

      const onClose = () => {
        setShow(false)
      }
      const onSave = async (newProduct: IProduct) => {
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
    const [radioValue, setRadioValue] = useState('1')

    const [currentCompareProducts, setCurrentCompareProducts] = useState<IJSONProduct[]>(
      compareProducts[currentTab.id.toString()]
    )
    useEffect(() => {
      switch (radioValue) {
        case '1':
          setCurrentCompareProducts(compareProducts[currentTab.id.toString()])
          break
        case '2':
          setCurrentCompareProducts(
            differentDataParser(compareProducts[currentTab.id.toString()], groups, fields)
          )
          break
      }
    }, [radioValue])

    // console.log('currentCompareProducts')
    // console.log(currentCompareProducts)
    return (
      <Drawer onClose={onClose} isOpen={isOpen} size={'full'}>
        <DrawerOverlay />
        <DrawerContent bg={'#001d00'}>
          <DrawerCloseButton />
          <DrawerHeader>HEADER</DrawerHeader>
          <DrawerBody>
            <Center>
              <RadioGroup value={radioValue} onChange={setRadioValue}>
                <Stack direction="row">
                  <Radio value="1">Все</Radio>
                  <Radio value="2">Отличия</Radio>
                  <Radio value="3">Одинаковые</Radio>
                </Stack>
              </RadioGroup>
            </Center>
            <Center>
              {currentCompareProducts && (
                <Box minH={'100px'} bg={'whiteAlpha.50'}>
                  <table className="compare-product-table">
                    <tbody>
                      <tr className="compare-product-table-head">
                        <td></td>
                        {currentCompareProducts.map((_product) => (
                          <td key={_product.id}>{_product.title}</td>
                        ))}
                      </tr>

                      <tr>
                        <td></td>
                        {currentCompareProducts.map((_product) => (
                          <td key={_product.id} className="compare-product-table-logo">
                            <Img
                              w={'150px'}
                              src={process.env.NEXT_PUBLIC_PRODUCT_LOGODIR! + _product.logo}
                              alt=""
                            />
                          </td>
                        ))}
                      </tr>
                      {currentCompareProducts![0]?.group!.map((_group: IProductGroups, i) => (
                        <React.Fragment key={_group.id}>
                          <tr>
                            <td className="compare-product-table-group-title">{_group.title}</td>
                            {currentCompareProducts.map((_product) => (
                              <td
                                key={_product.title}
                                className="compare-product-table-group-title"
                              ></td>
                            ))}
                          </tr>
                          {_group!.field!.map((_field, k) => (
                            <tr key={_field.id}>
                              <td className="compare-product-table-field-title">{_field.title}</td>
                              {currentCompareProducts.map((_product) => (
                                <td key={_product.id} className="compare-product-table-field-value">
                                  {_product!.group![i]!.field![k]!.value!}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </Box>
              )}
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    )
  }

  useEffect(() => {
    let prodArr: IJSONProduct[] = []
    allProducts.map((product) => {
      product.typeId === currentTab.id && prodArr.push(product)
    })

    return setCurrnetProducts(prodArr)
  }, [currentTab])

  const tabsChange = async (type: IProductTypes) => {
    await setCurrnetTab(type)
  }
  const onDelete = (product: IProduct) => {
    console.log(product)
  }

  const compare = (product: IJSONProduct, flag: boolean) => {
    if (flag) {
      let json = compareProducts
      json[product.typeId.toString()].push(product)
      setCompareProducts({ ...json })
    } else {
      let json = compareProducts
      let array = json[product.typeId.toString()]
      json[product.typeId.toString()] = array.filter((i) => i.id !== product.id)
      setCompareProducts({ ...json })
    }
    setAllProducts(
      allProducts.map((_product, i) =>
        product.id == _product.id ? { ..._product, isCompare: flag } : { ..._product }
      )
    )
    if (compareProducts[currentTab.id.toString()].length > 1) {
      setCompareDisabled(false)
    } else {
      setCompareDisabled(true)
    }
  }

  return (
    <>
      <Button onClick={() => handleClick()} m={4} color={'black'} isDisabled={compareDisabled}>
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
    </>
  )
}
export default AllProductsPage
