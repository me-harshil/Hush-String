import React from 'react'

const ProductInfo = ({params}) => {
    const slug = params.slug
  return (
    <div>{slug}</div>
  )
}

export default ProductInfo