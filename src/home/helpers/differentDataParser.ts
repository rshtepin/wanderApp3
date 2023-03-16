import { IJSONProduct, IProductFields, IProductGroups } from 'src/types'
const uniqueValues = new Set()
const getValue = (id_variable, Product: IJSONProduct) => {
  const result: any = Product.Variable_value!.filter(
    (item: any) => item.id_variable === id_variable
  )
  if (result.length > 0) return result![0]!.value!
}
const differentDataParser = (products, groups, fields) => {
  const diffProductsArray = products.map((product: IJSONProduct) => {
    product.group = groups
      .filter((_group: IProductGroups) => _group.typeId === product.typeId)
      .map((_group: IProductGroups) => ({
        ..._group,
        field: fields
          .filter((_field: IProductFields) => _field.id_group === _group.id)
          .filter((_field: IProductFields) => {
            const fieldValue = getValue(_field.id, product)
            if (fieldValue && uniqueValues.has(fieldValue)) {
              return false
            }
            uniqueValues.add(fieldValue)
            return true
          })
          .map((_field: IProductFields) => ({
            ..._field,
            value: getValue(_field.id, product),
          })),
      }))
    return product
  })

  return diffProductsArray
}

export default differentDataParser
