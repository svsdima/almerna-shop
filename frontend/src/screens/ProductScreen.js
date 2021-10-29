import React from 'react'
import {Link} from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../product'

const ProductScreen = ({match}) => {
  const product = products.find((p) => p._id === match.params.id)
  const {
    name,
    image,
    price: prices,
    colors,
    description,
    height,
    size,
  } = product
  let mainImg = image[0]
  let price = prices.toFixed(2)
  return (
    <div className={`product-screen ${product}`}>
      <div className='container'>
        <div className='product-screen-nav'>
          <Link to='/'>Home</Link> / <Link to='/catalog'>Catalog</Link> /
          <span> Lingerie</span>
        </div>
        <div className='product-screen-wrapper'>
          <div className='product-screen-images'>
            <div className='product-screen-images-list'>
              {image.map((image, index) => (
                <div className='product-screen-image'>
                  <img src={image} alt={name} />
                </div>
              ))}
            </div>
            <div className='product-screen-mainImg'>
              <img src={mainImg} alt={name} />
            </div>
          </div>
          <div className='product-screen-info'>
            <div className='product-screen-title'>{name}</div>
            <div className='product-screen-price'>${price}</div>
            <div className='product-screen-subtitle'>Color</div>
            <div className='product-screen-colors'>
              {colors.map((color) => (
                <div
                  style={{backgroundColor: color}}
                  className={`product-screen-color ${color}`}
                ></div>
              ))}
            </div>
            <button className='btn'>Add to bag by ${price}</button>
            <div className='product-screen-subtitle'>Description</div>
            <div className='product-screen-descr'>
              {description}
              <div>
                Model: Height {height} m, Size: {size}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen
