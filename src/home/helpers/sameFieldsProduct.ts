import { IJSONProduct } from 'src/types'

const sameFields = (products: IJSONProduct[]): IJSONProduct[] => {
  const filterIds = new Set<number>() // использование Set вместо массива для id
  // Находим id, у которых есть повторяющиеся значения
  if (products) {
    products.forEach((product) => {
      product.group?.forEach((group) => {
        // использование "?." для безопасного доступа
        group.field?.forEach((field) => {
          if (!filterIds.has(field.id)) {
            const hassameFieldserentValue = products.some((otherProduct) => {
              const otherField = otherProduct.group
                ?.find((otherGroup) => otherGroup.id === group.id)
                ?.field?.find((otherField) => otherField.id === field.id)
              return otherField && otherField.value !== field.value
            })
            if (hassameFieldserentValue) {
              filterIds.add(field.id) // использование метода add() для добавления id в Set
            }
          }
        })
      })
    })
  } else products = []
  // Удаляем поля field с выбранными id
  products.forEach((product) => {
    product.group?.forEach((group) => {
      group.field = group.field?.filter((field) => !filterIds.has(field.id)) // использование метода has() для проверки наличия id в Set
    })
  })

  return products
}

export default sameFields
