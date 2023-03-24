import { IJSONProduct, IProductFields, IProductGroups } from 'src/types'
const getValue = (id_variable, Product: IJSONProduct) => {
  const result: any = Product.Variable_value!.filter(
    (item: any) => item.id_variable === id_variable
  )
  if (result.length > 0) return result![0]!.value!
}
const allDataParser = (products, groups, fields) => {
  const allProductsArray = products.map((_product: IJSONProduct) => {
    const product = { ..._product }
    product.isCompare = false
    product.group = groups
      .filter((_group: IProductGroups) => _group.typeId === product.typeId)
      .map((_group: IProductGroups) => ({
        ..._group,
        field: fields
          .filter((_field: IProductFields) => _field.id_group === _group.id)
          .map((_field: IProductFields) => ({
            ..._field,
            value: getValue(_field.id, product),
          })),
      }))
    return product
  })

  return allProductsArray
}

export default allDataParser
