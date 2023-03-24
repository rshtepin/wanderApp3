import {
  Box,
  Center,
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
} from '@chakra-ui/react'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import sameFields from 'src/home/helpers/sameFieldsProduct'
import { IProductGroups } from 'src/types'

const CompareBlock = ({ currentCompareProducts, isOpen, onOpen, onClose, radioValueHandle }) => {
  const [radioValue, setRadioValue] = useState('1')

  const setRadioValueHandle = (v) => {
    radioValueHandle(v)
    setRadioValue(v)
  }

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={'full'}>
      <DrawerOverlay />
      <DrawerContent bg={'#001d00'}>
        <DrawerCloseButton />
        <DrawerHeader>HEADER</DrawerHeader>
        <DrawerBody>
          <Center>
            <RadioGroup value={radioValue} onChange={setRadioValueHandle}>
              <Stack direction="row">
                <Radio value="1">Все</Radio>
                <Radio value="2">Одинаковые</Radio>
                <Radio value="3">Отличия</Radio>
              </Stack>
            </RadioGroup>
          </Center>
          <Center>
            {currentCompareProducts !== undefined && (
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
export default CompareBlock
