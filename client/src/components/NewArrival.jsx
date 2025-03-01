import React from 'react';
import Product from './Product';
import data from '../data';

const NewArrival = () => {
  return (
    <div id="feature-products" className="section-p1">
      <h1>New Arrivals</h1>
      <p>Summer Collection New Modern Design</p>
      <div className="products">
        {data.arrivals.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
