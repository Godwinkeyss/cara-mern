import React, { useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

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
const AllProductScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = Number(sp.get('page')) || 1;
  const [categories, setCategories] = useState([]);
  const [catOpen, setCatOpen] = useState(false);
  const [{ products, pages, loading, error }, dispatch] = useReducer(reducer, {
    products: [],
    pages: 1,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/products?page=${page}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/categories');
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', getError(err));
      }
    };
    fetchCategories();
  }, []);

  const prevPage = () => {
    if (page > 1) navigate(`/products?page=${page - 1}`);
  };

  const nextPage = () => {
    if (page < pages) navigate(`/products?page=${page + 1}`);
  };
  // display products in grid format with pagination and search functionality
  // use Redux to manage state for products and pagination
  // implement sorting functionality for products based on price, rating, and popularity

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <div>
      <div className="all_product_container section-p1">
        {/* <h1 className='text-center'>All Product</h1> */}
        <div className={!catOpen ? 'product_cat' : 'product_cat cat_active'}>
          <h4 className="mt-2">Categories</h4>
          <div>
            <ul className="categories-list">
              <li>
                {categories.map((cat, index) => (
                  <div key={index} className="product_cat_item">
                    <Link to={`/search?category=${cat}`}>{cat}</Link>
                  </div>
                ))}
              </li>
            </ul>
          </div>
          {/* {categories.map((cat, index) => (
            <div key={index} className='product_cat_item'>
              <Link to={`/search?category=${cat}`}>{cat}</Link>
            </div>
          ))} */}
        </div>
        <div
          className={
            catOpen ? 'all_product ' : 'all_product products section-product'
          }
          id="feature-products">
          <div className="pro-header">
            <div
              className="btn btn-secondary"
              onClick={() => setCatOpen(!catOpen)}>
              Categories
            </div>
            <h2>Products</h2>
            <div>filter</div>
          </div>
          <div className="products">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))
            )}
          </div>
          {/* Implement pagination */}
          {/* Pagination */}
          <div className="mt-4">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={
                  x + 1 === Number(page)
                    ? 'btn text-bold btnCart'
                    : 'btn btn-cart'
                }
                key={x + 1}
                to={`/allproduct?page=${x + 1}`}>
                {x + 1}
              </Link>
            ))}
          </div>
          {/* Implement search functionality */}
          {/* Implement sorting functionality */}
          {/* Implement filtering functionality */}
          {/* Implement wishlist functionality */}
          {/* Implement cart functionality */}
          {/* Implement checkout functionality */}
          {/* Implement user authentication */}
          {/* Implement user profile */}
          {/* Implement user order history */}
        </div>
      </div>
    </div>
  );
};

export default AllProductScreen;
