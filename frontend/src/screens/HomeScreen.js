import React from 'react'
import products from '../product'
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <div className='home-screen'>
      <div className='container'>
        <h1 className='title'>
          Shop Our <span>Trending</span> Products
        </h1>
        <div className='product-list'>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
