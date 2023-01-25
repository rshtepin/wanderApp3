import React from 'react'

export const ProductPropField = (prop) => {
  const { field, value } = prop

  return (
    <div className="row-product-prop">
      <div className="row-product-prop-left-column">{field.name}</div>
      <div className="row-product-prop-right-column">{value}</div>
    </div>
  )
}
