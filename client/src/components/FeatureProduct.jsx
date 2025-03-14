import React, { useState, useEffect, useReducer } from 'react';
import data from '../data';
import Product from './Product';
import axios from 'axios';
import LoadingBox from './LoadingBox'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const FeatureProduct = () => {
  // const [products, setProducts] = useState([])
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: false,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const res = await axios.get('http://127.0.0.1:5000/api/products');
        // setProducts(res.data)
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <section id="feature-products" className="section-p1">
      <h1>Featured Products</h1>
      <p>Summer Collection New Modern Design</p>

      <div className="products">
        {loading ? (
          <h2 style={{textAlign:'center'}}><LoadingBox /></h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

export default FeatureProduct;
