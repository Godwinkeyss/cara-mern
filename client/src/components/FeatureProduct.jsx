import React from 'react'
import data from '../data'
import Product from './Product'

const FeatureProduct = () => {
  return (
    <section id='feature-products' className='section-p1'>
      <h1>Featured Products</h1>
      <p>Summer Collection New Modern Design</p>

      <div className='products'>
         
         {
          data.products.map((product)=>(
            <Product key={product.id} product={product} />
           
          ))
         }
        
         
         
        
         
        
         
      </div>
      
    </section>
  )
}

export default FeatureProduct
