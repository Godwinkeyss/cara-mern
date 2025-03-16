import React, { useEffect, useReducer, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Product from '../components/Product'

const reducer = (state,action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {
       ...state,
        loading:true
      }
    case 'FETCH_SUCCESS':
      return {
       ...state,
        products:action.payload,
        loading:false
      }
    case 'FETCH_FAIL':
      return {
       ...state,
        error:action.payload,
        loading:false
      }
    default:
      return state
  }
}
const AllProductScreen = () => {
    const [categories,setCategories] = useState([])
    const [catOpen,setCatOpen] = useState(false)
    const [{products,loading,error},dispatch] = useReducer(reducer,{
      products:[],
      loading:true,
      error:null
    })

   useEffect(()=>{
      const fetchData = async()=>{
        try{
            dispatch({type:'FETCH_REQUEST'})
            const {data} = await axios.get('/api/products')
            dispatch({type:'FETCH_SUCCESS',payload:data})
        } catch(error){
            dispatch({type:'FETCH_FAIL',payload:error.message})
        }
      }
      fetchData()
 
   },[])


    useEffect(()=>{
     const fecthData = async()=>{
        try{
            const {data} = await axios.get('/api/products/categories')
            setCategories(data)
        } catch(error){
            console.error(error)
        }
     }
     fecthData()
    },[])
    // display products in grid format with pagination and search functionality
    // use Redux to manage state for products and pagination
    // implement sorting functionality for products based on price, rating, and popularity

  return (
    <div>
      <div className='all_product_container section-p1'>
          {/* <h1 className='text-center'>All Product</h1> */}
          <div className={!catOpen?'product_cat':'product_cat cat_active'}>
            <h4 className='mt-2'>Categories</h4>
            <div>
                <ul className='categories-list'>
                    <li>
                    {categories.map((cat, index) => (
            <div key={index} className='product_cat_item'>
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
          <div className={catOpen?'all_product ':'all_product products section-product'} id='feature-products'>
            <div className='pro-header'>
              <div className='btn btn-secondary' onClick={()=>setCatOpen(!catOpen)}>Categories</div>
              <h2>Products</h2>
              <div>
                filter
              </div>
            </div>
            <div className='products'>
            {loading? <div>Loading...</div> : error? <div>{error}</div> : (
              products.map(product => (
                <Product product={product} />
              ))
            )}
            </div>
            {/* Implement pagination */}
            <div className='mt-5'>
              {/* <div>Page 1 of {Math.ceil(products.length / 12)}</div> */}
              <div className=''>
                <button className='btn btn-sm btn-success mx-3' disabled={loading} onClick={() => { }}>Prev</button>
                <button className='btn btn-sm btn-success' disabled={loading} onClick={() => { }}>Next</button>
              </div>
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
  )
}

export default AllProductScreen
