import { Input, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react'
import React from 'react'

export const ProductPropEditField = (prop) => {
  const { field, value, save, product } = prop

  return (
    <div className="row-product-prop">
      <Stack spacing={3}>
        <InputGroup>
          <InputLeftAddon children={field.name} minW="220px" />
          <div className="row-product-prop-right-column">
            <Input
              type="text"
              onBlur={(e) =>
                save({ id_product: product.id, id_variable: field.id, value: e.target.value })
              }
              defaultValue={value}
              width={300}
            />
          </div>
        </InputGroup>
      </Stack>
    </div>
  )
}
