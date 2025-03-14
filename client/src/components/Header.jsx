import React, { useState, useContext } from 'react';
import { Store } from '../Store';
import {Link} from 'react-router-dom'

const Header = () => {
  const [open, setIsOpen] = useState(false);
  console.log(open);
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <div>
      <section className="header">
        <a href="/">
          <img src="/img/logo.png" alt="Logo" />
        </a>
        <div>
          <ul className="navbar">
            <li><a className="active" href="/">Home</a></li>
            <li><a href="/">Product</a></li>
            <li><a href="/">Blog</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/signin">Signin</a></li>
            <li style={{ position: 'relative' }}>
             <Link to='/cart'> <i className="fa-solid fa-bag-shopping"></i>
              <span
                style={{
                  backgroundColor: '#088178',
                  color: 'white',
                  fontSize: '12px',
                  height: '20px',
                  position: 'absolute',
                  alignItems: 'center',
                  minWidth: '20px',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  top: '-5px',
                  right: '-2px',
                  borderRadius: '50%',
                }}
              >
                {cart.cartItems.length > 0 ? cart.cartItems.length : 0}
              </span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="ham">
          <button
            onClick={() => setIsOpen(!open)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            <i className="fa-solid fa-bars bug"></i>
          </button>
          <span>{cart.cartItems.length > 0 ? cart.cartItems.reduce((a, c) => a  + c.quantity, 0): 0}</span>
        </div>

        {open && (
          <div className="navbar-small">
            <ul className="nav">
              <li><a className="active" href="/">Home</a></li>
              <li><a href="/">Product</a></li>
              <li><a href="/">Blog</a></li>
              <li><a href="/">About</a></li>
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default Header;
