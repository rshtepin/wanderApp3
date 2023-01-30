import { Suspense, useEffect, useState } from 'react'
import Head from 'next/head'
import { useQuery, usePaginatedQuery, useMutation } from '@blitzjs/rpc'
import { useParam } from '@blitzjs/next'
import Layout from 'src/core/layouts/Layout'
import getProduct from 'src/products/queries/getProduct'
import getAllFields from 'src/products/template-editor/queries/getAllFields'
import { ProductPropEditField } from 'src/products/components/ProductPropEditField'
import addUpdateFieldValue from 'src/products/mutations/addUpdateFieldValue'
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Img,
  Input,
  Textarea,
} from '@chakra-ui/react'
import addUpdateProduct from 'src/products/mutations/addUpdateProduct'
import uploadImageFile from 'src/products/helpers/uploadImageLogo'
const uuid = require('uuid')

export const Product = () => {
  const [addUpdateProductFieldValueMutation] = useMutation(addUpdateFieldValue)
  const [addUpdateProductFieldMutation] = useMutation(addUpdateProduct)
  const productId = useParam('productId', 'number')
  const [Product] = useQuery(getProduct, { id: productId })
  const [Avatar, SetAvatar] = useState<String>('')
  const [objUrl, setObjUrl] = useState<string | undefined>()

  async function fetchImageBlob(): Promise<Blob> {
    const response = await fetch('http://localhost:3000/media/images/productlogo/' + Product.logo)
    // if (!response.ok) throw new Error('Response not OK')
    return response.blob()
  }

  useEffect(
    () =>
      void (async () => {
        if (objUrl) return
        const blob = await fetchImageBlob()
        const oUrl = URL.createObjectURL(blob)
        setObjUrl(oUrl)
      })(),
    [objUrl]
  )
  const pass = async (i) => {
    console.log('TEST: ')
    const oUrl = URL.createObjectURL(i)
    setObjUrl(oUrl)
  }

  const uploadToClient = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let passFlag: boolean = false
      const i = event.target.files[0]
      const f = await uploadImageFile(i, Product.id, Product.title, Product.logo, { pass })
      console.log(f)
    }
  }

  const [{ fields, hasMore }] = usePaginatedQuery(getAllFields, {
    orderBy: { order: 'asc' },
    skip: 0,
    take: 100,
  })
  const getValue = (id_variable) => {
    let res = ''
    let result = Product.Variable_value.filter((item) => item.id_variable === id_variable)
    if (result.length > 0) {
      res = result[0].value
    }
    return res
  }

  return (
    <>
      <Head>
        <title>{Product.title}</title>
      </Head>

      <div className="product-main-body">
        <div className="content-product-container">
          <div className="header-product-container">
            <div className="one-product-page-header">
              <HStack spacing="24px">
                <Img height="50px" objectFit="cover" src={objUrl} alt={'Logo ' + Product.title} />

                <Input
                  type="file"
                  color={'red'}
                  accept="image/png, image/gif, image/jpeg, image/svg+xml"
                  onChange={uploadToClient} // Выбор файла
                />
                <Input
                  type="text"
                  placeholder="Название продукта"
                  fontSize={24}
                  onBlur={(e) =>
                    addUpdateProductFieldMutation({
                      title: e.target.value,
                      id: Product.id,
                    })
                  }
                  defaultValue={Product.title}
                  width={'100%'}
                />
              </HStack>
            </div>
            <FormControl>
              <div className="one-product-page-subtitle">
                <FormLabel mb="0px">Короткое описание видно внутри карточки продукта</FormLabel>
                <Textarea
                  type="text"
                  onBlur={(e) =>
                    addUpdateProductFieldMutation({
                      title: Product.title,
                      shortdesc: e.target.value,
                      id: Product.id,
                    })
                  }
                  defaultValue={Product.shortdesc}
                  width={'100%'}
                />
              </div>
              <div className="one-product-page-subtitle">
                <FormLabel paddingTop={5} mb="0px">
                  Длинное описание видно на странице со всеми продуктами
                </FormLabel>
                <Textarea
                  type="text"
                  resize={'vertical'}
                  height={100}
                  onBlur={(e) =>
                    addUpdateProductFieldMutation({
                      title: Product.title,
                      longdesc: e.target.value,
                      id: Product.id,
                    })
                  }
                  defaultValue={Product.longdesc}
                  width={'100%'}
                />
              </div>
            </FormControl>
          </div>

          <div className="description-block">
            <div className="table-product-props-container">
              <div className="description-part-title">Тип системы</div>
              {fields.map((item) => (
                <ProductPropEditField
                  key={item.id}
                  product={Product}
                  field={item}
                  value={getValue(item.id)}
                  save={addUpdateProductFieldValueMutation}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const EditProductPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Product />
    </Suspense>
  )
}

EditProductPage.authenticate = true
EditProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProductPage
