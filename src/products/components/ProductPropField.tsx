import React from 'react'

export const ProductPropField = (prop) => {
  const { field, value } = prop

  return (
    <li>
      <span className="title">{field.title}</span>
      <span className="chapter">{value}</span>
    </li>
  )
}
