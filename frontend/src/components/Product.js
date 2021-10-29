import React from 'react'
import {Link} from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <div className='product-item'>
      <div className='product-card'>
        <Link to={`/product/${product._id}`} className='product-img'>
          <img src={product.image[0]} alt={product.name}></img>
        </Link>
      </div>
      <Link to={`/product/${product._id}`} className='product-title'>
        {product.name}
      </Link>
      <div className='product-info'>
        <h4 className='product-price'>${product.price}</h4>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </div>
    </div>
  )
}

export default Product
