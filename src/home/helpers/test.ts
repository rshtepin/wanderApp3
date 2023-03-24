import { IJSONProduct, IProductFields, IProductGroups } from 'src/types'

const allDataParser = (products, groups, fields) => {
  let allProductsArray = [] as IJSONProduct[]
  console.log('products in TS')
  console.log(products)
  console.log('groups in TS')
  console.log(groups)
  console.log('fields in TS')
  console.log(fields)

  const getValue = (id_variable, Product: IJSONProduct) => {
    const result: any = Product.Variable_value!.filter(
      (item: any) => item.id_variable === id_variable
    )
    if (result.length > 0) return result![0]!.value!
  }

  for (var i = 0; i < products.length; i++) {
    const _product = products[i]
    allProductsArray[i] = _product
    allProductsArray[i]!.isCompare = false
    allProductsArray[i]!.group = []

    for (var k = 0; k < groups.length; k++) {
      const _group: IProductGroups = groups![k]!
      // groups[0].forEach((_group: IProductGroups, k) => {
      if (_group.typeId === allProductsArray[i]!.typeId) {
        allProductsArray[i]!.group!.push(_group)
        allProductsArray[i]!.group![k]!.field = []

        for (var j = 0; j < fields.length; j++) {
          const _field: IProductFields = fields[j]!
          if (_field.id_group === allProductsArray[i]!.group![k]!.id) {
            _field.value = getValue(_field.id, _product)
            allProductsArray[i]!.group![k]!.field!.push(newfield)
          }
        }
      }
    }
  }

  return allProductsArray
}

export default allDataParser
