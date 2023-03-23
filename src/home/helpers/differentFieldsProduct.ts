import { IJSONProduct } from 'src/types'

const differentFieldsProduct = (products: IJSONProduct[]): IJSONProduct[] => {
  const filterIds = new Set<number>() // использование Set вместо массива для id
  // Находим id, у которых есть отличающиеся значения
  if (products) {
    products.forEach((product) => {
      product.group?.forEach((group) => {
        group.field?.forEach((field) => {
          if (!filterIds.has(field.id)) {
            const hassameFieldserentValue = products.some((otherProduct) => {
              const otherField = otherProduct.group
                ?.find((otherGroup) => otherGroup.id === group.id)
                ?.field?.find((otherField) => otherField.id === field.id)
              return otherField && otherField.value !== field.value
            })
            if (!hassameFieldserentValue) {
              filterIds.add(field.id)
            }
          }
        })
      })
    })
  } else products = []

  products.forEach((product) => {
    product.group?.forEach((group) => {
      group.field = group.field?.filter((field) => !filterIds.has(field.id))
    })
  })

  return products
}

export default differentFieldsProduct
