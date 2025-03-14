import React from 'react'
import {Link} from 'react-router-dom'
import Rating from './Rating'
const Product = ({product}) => {
  return (
    <div className='product'>
      <Link to={`/products/${product.slug}`}>
      {product.images?.[0] ? (
        <Link to={`/products/${product.slug}`}>
          <img src={product.images[0]} alt={product.name} />
        </Link>
      ) : (
         <Link to={`/products/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      )}
      </Link>
    <div className='desc'>
      <span>Adida</span>
      <h5> <Link to={`/products/slug/${product.slug}`}>{product.name}</Link></h5>
      <div className='rating'>
        <Rating rating={product.rating} numReview={product.numReviews}/>
      </div>
      <p>${product.price}</p>
    </div>
      <a href=""><i className="fa-solid fa-cart-shopping cart"></i></a>
  </div>
  )
}

export default Product
