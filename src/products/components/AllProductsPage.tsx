/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from 'react'
import { useEffect, useState } from 'react'
import { useSession } from '@blitzjs/auth'
import { useMutation, usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { usePagination } from 'src/core/hooks/usePagination'

import { Box, Button, Divider, useDisclosure, Wrap } from '@chakra-ui/react'

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
import sameFields from 'src/home/helpers/sameFieldsProduct'
import CompareBlock from './CompareBlock'
import differentFieldsProduct from 'src/home/helpers/differentFieldsProduct'

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
  const [compareProducts, setCompareProducts] = useState<Record<string, IJSONProduct[]>>({})
  const [compareShowProducts, setCompareShowProducts] = useState<Record<string, IJSONProduct[]>>({})
  const [compareDisabled, setCompareDisabled] = useState<boolean>(true)
  const [show, setShow] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    onOpen()
  }
  useEffect(() => {
    let json: any = []
    types.map((i) => {
      json[i.id.toString()] = []
    })
    setCompareProducts({ ...json })
    setCompareShowProducts({ ...json })
  }, [])

  useEffect(() => {
    setCompareShowProducts({ ...compareProducts })
  }, [compareProducts])

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
    setCompareProducts((prevProducts) => {
      const typeId = product.typeId.toString()
      const updatedProducts = { ...prevProducts }
      if (flag) {
        if (typeId in updatedProducts) {
          updatedProducts[typeId]!.push(product)
        } else {
          updatedProducts[typeId] = [product]
        }
      } else {
        console.log('ID ', product.id)
        if (typeId in updatedProducts) {
          updatedProducts[typeId] = updatedProducts[typeId]!.filter(
            (item) => item.id !== product.id
          )
        }
      }
      setCompareDisabled(updatedProducts[typeId]!.length <= 1)
      return updatedProducts
    })

    setAllProducts(
      allProducts.map((_product, i) =>
        product.id == _product.id ? { ..._product, isCompare: flag } : { ..._product }
      )
    )
  }
  const radioValueHandle = (value) => {
    switch (value) {
      case '1': {
        setCompareShowProducts({ ...compareProducts })

        break
      }
      case '2': {
        const sameF: IJSONProduct[] = sameFields(
          JSON.parse(JSON.stringify(compareProducts[currentTab.id.toString()]))
        )
        setCompareShowProducts((prevProducts) => {
          const updatedProducts = { ...prevProducts }
          updatedProducts[currentTab.id.toString()] = sameF
          return updatedProducts
        })
        break
      }
      case '3': {
        const diffF: IJSONProduct[] = differentFieldsProduct(
          JSON.parse(JSON.stringify(compareProducts[currentTab.id.toString()]))
        )
        setCompareShowProducts((prevProducts) => {
          const updatedProducts = { ...prevProducts }
          updatedProducts[currentTab.id.toString()] = diffF
          return updatedProducts
        })
      }
    }
  }
  return (
    <>
      {compareShowProducts[currentTab.id.toString()]?.map((pro) => JSON.stringify(pro.title))}
      <Button onClick={() => handleClick()} m={4} color={'black'} isDisabled={compareDisabled}>
        Сравнить
      </Button>
      <CompareBlock
        currentCompareProducts={compareShowProducts[currentTab.id.toString()]}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        radioValueHandle={radioValueHandle}
      />
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
