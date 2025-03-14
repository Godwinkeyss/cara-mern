import React,{useContext} from 'react'
import {Store} from '../Store'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const CartScreen = () => {
    const navigate = useNavigate()
    const {state,dispatch:ctxDispatch} = useContext(Store)
    const {cart:{
        cartItems
    }} = state

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`http://127.0.0.1:5000/api/products/id/${item._id}`);
        if (data.countInStock < quantity) {
          window.alert('Sorry. Product is out of stock');
          return;
        }
        ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...item, quantity },
        });
      };
      const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
      };

   const checkoutHandler=()=>{
    navigate('/signin?redirect=/shipping');
   }

  return (
    <div className='cart'>
      <div className='cart-banner'>
        <h1>#let's_talk</h1>
        <p>LEAVE A MESSAGE   <span>We love to hear from you!</span></p>
      
      </div>
      <div className='cart-table section-p1 table-responsive'>
         <table width='100%'>
            <thead>
                <tr>
                    <td>Remove</td>
                    <td>Images</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Subtotal({cartItems.reduce((a,c)=>a + c.quantity,0)} items)</td>
                </tr>
            </thead>
            <tbody>
                {
                    cartItems.map((item)=>(
                        <tr>
                    <td>
                        <button  onClick={() => removeItemHandler(item)}><i className='far fa-times-circle'></i></button>
                    </td>
                    <td>
                        <img src={item.images[0]} width='80px'/>
                    </td>
                    <td>
                        <p>{item.name}</p>
                    </td>
                    <td>
                        <p>£{item.price}</p>
                    </td>
                    <td>
                       <div>
                       <button  onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }  disabled={item.quantity === 1}><i className='fa fa-minus-circle'></i></button>
                         <span>{item.quantity}</span>
                        <button  onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        } disabled={item.quantity === item.countInStock}><i className='fa fa-plus-circle'></i></button>
                       </div>
                    </td>
                    <td>
                        <p><strong>£</strong>{(item.price * item.quantity).toFixed(2)}</p>
                    </td>
                </tr>
                    ))
                }
               
                
            </tbody>
         </table>
      </div>
      <div className='cart-total section-p1'>
        <div className='cart-left'>
            <h2>Apply Coupon</h2>
            <div>
                <input placeholder='Enter Your Coupon Code' />
                <button>Apply</button>
            </div>
        </div>
        <div className='cart-right'>
            <div className='subtotal'>
                <h2>Cart Total</h2>
                <table>
                    <tr>
                        <td>Cart Subtotal</td>
                        <td>£ {(cartItems.reduce((a, c) => a + c.price * c.quantity, 0)).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td>free</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>£{(cartItems.reduce((a, c) => a + c.price * c.quantity, 0)).toFixed(2)}</strong></td>
                    </tr>
                </table>
                <button disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartScreen
