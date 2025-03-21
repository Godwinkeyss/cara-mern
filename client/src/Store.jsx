import { createContext,useReducer } from 'react'

export const Store = createContext()

const initialState = {
  userInfo: localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null,

   cart:{
    shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        :  {},
    paymentMethod: localStorage.getItem('paymentMethod')
        ? localStorage.getItem('paymentMethod')
        : '',
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
   }
}

function reducer(state,action){
  switch(action.type){
    case 'CART_ADD_ITEM': {
        const item = action.payload;
        const existItem = state.cart.cartItems.find((x) => x._id === item._id);
        const cartItems = existItem
            ? state.cart.cartItems.map((x) =>
                x._id === existItem._id ? item : x
              )
            : [...state.cart.cartItems, item];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
        const cartItems = state.cart.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
      }
    case 'CART_CLEAR':
        return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'USER_SIGNIN':{
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
      return {...state,userInfo:action.payload}
    }
    case 'USER_SIGNOUT':
        return {
          ...state,
          userInfo: null,
          cart: {
            cartItems: [],
            shippingAddress: {},
            paymentMethod: '',
          },
        };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
          ...state,
          cart: { ...state.cart, paymentMethod: action.payload },
        };
    default:
        return state;

  }

 }

export const StoreProvider =(props)=>{
 const [state,dispatch] = useReducer(reducer,initialState)
 const value = {state,dispatch}
 return <Store.Provider value={value}>{props.children}</Store.Provider>
}