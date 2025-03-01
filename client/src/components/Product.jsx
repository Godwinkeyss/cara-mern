import React from 'react'

const Product = ({product}) => {
  return (
    <div className='product'>
    <img src={product.image} alt={product.name} />
    <div className='desc'>
      <span>Adida</span>
      <h5>{product.name}</h5>
      <div className='rating'>
         <i class="fa-solid fa-star"></i>
         <i class="fa-solid fa-star"></i>
         <i class="fa-solid fa-star"></i>
         <i class="fa-solid fa-star"></i>
         <i class="fa-solid fa-star"></i>
      </div>
      <p>${product.price}</p>
    </div>
      <a href=""><i class="fa-solid fa-cart-shopping cart"></i></a>
  </div>
  )
}

export default Product
