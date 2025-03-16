import React, { useState, useEffect, useReducer } from 'react';
import data from '../data';
import Product from './Product';
import axios from 'axios';
import LoadingBox from './LoadingBox'
import {useLocation} from 'react-router-dom'
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
const FeatureProduct = () => {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;
   const [{ products, pages, loading, error }, dispatch] = useReducer(reducer, {
     products: [],
     pages: 1,
     loading: true,
     error: null,
   });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        // const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        const res = await axios.get(`/api/products?page=${page}`);
        // setProducts(res.data)
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
        console.log("API Response:", res.data);
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
        console.log("API Response:", error);
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
