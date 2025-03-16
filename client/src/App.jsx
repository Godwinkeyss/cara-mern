import { useState } from 'react';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header';
import NavHeader from './components/NavHeader';

import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import CartScreen from './pages/CartScreen';
import ProfileScreen from './pages/ProfileScreen';
import SignUpScreen from './pages/SignUpScreen';
import SigninScreen from './pages/SigninScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import OrderHistoryScreen from './pages/OrderHistoryScreen';
import PaymentScreen from './pages/PaymentScreen';
import ShippingScreen from './pages/ShippingScreen';
import ProductScreen from './pages/ProductScreen';
import AllProductScreen from './pages/AllProductScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchScreen from './pages/SearchScreen';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <div className="site-container">
          <div className="head">
            {/* <Header /> */}
            <NavHeader />
          </div>
          <div className="main">
            <Routes>
              <Route path="/orderHistory" element={<OrderHistoryScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/allproduct/" element={<AllProductScreen />} />
              <Route path="/products/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </div>
          <div className="foot">
            <Footer />
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
