import React from 'react'
import { IProduct, IProductTypes } from 'src/types'
import ProductItemCard from './ProductItemCard'

interface AllProductsProps {
  product: IProduct[]
  type: IProductTypes
  onDelete: (product: IProduct) => void
  compare: (product: IProduct, flag: boolean) => void
}

export function AllProducts({ product, onDelete, compare }: AllProductsProps) {
  return (
    <>
      {product.map((item) => (
        <ProductItemCard key={item.id} product={item} onDelete={onDelete} compare={compare} />
      ))}
    </>
  )
}
