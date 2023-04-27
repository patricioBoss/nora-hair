import React from 'react'
import ProductCard from './productCard'

const ProductDisplay = ({filterProducts}) => {
  return (
    <div>
         {filterProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
    </div>
  )
}

export default ProductDisplay
