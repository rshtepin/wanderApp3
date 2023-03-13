/* eslint-disable react/no-children-prop */
import { Input, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react'
import React from 'react'

export const ProductPropEditField = (prop) => {
  const { field, value, save, product } = prop

  return (
    <Stack spacing={3} w={'100%'} mb={2}>
      <InputGroup size={'xs'}>
        <InputLeftAddon children={field.title} flexWrap={'wrap'} />
        <div className="row-product-prop-right-column">
          <Input
            textAlign={'right'}
            size={'xs'}
            type="text"
            onBlur={(e) =>
              save({ id_product: product.id, id_variable: field.id, value: e.target.value })
            }
            defaultValue={value}
            width={'100%'}
          />
        </div>
      </InputGroup>
    </Stack>
  )
}
