import React from 'react'

const Footer = () => {
  return (
    <div className='footer section-p1'>
       <div className='footer1'>
        <img src="/img/logo.png" alt="" />
        <h4>Contact</h4>
        <ul>
            <li><strong>Address:</strong>64 Crescent Road Middlesbrough</li>
            <li><strong>Phone:</strong>+44 778 012 7483</li>
            <li><strong>Hours:</strong>10:00-18:00pm Mon-Sat</li>
        </ul>
        <div className='follow'>
           <span><i className="fa-brands fa-facebook-f"></i></span>
           <span><i className="fa-brands fa-twitter"></i></span>
           <span><i className="fa-brands fa-instagram"></i></span>
           <span><i className="fa-brands fa-pinterest-p"></i></span>
           <span><i className="fa-brands fa-github"></i></span>
           <span><i className="fa-brands fa-youtube"></i></span>
        </div>
       </div>
       <div className='footer2'>
        <h4>About</h4>
        <ul>
            <li>About Us</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
            <li>Terms And Conditions</li>
            <li>Contact Us</li>
        </ul>
       </div>
       <div className='footer3'>
        <h4>My Account</h4>
        <ul>
            <li>Sign In</li>
            <li>View Cart</li>
            <li>My Whishlist</li>
            <li>Track My Order</li>
            <li>Help</li>
        </ul>
       </div>
       <div className='footer4'>
        <h4>Install App</h4>
        <ul>
            <li>From App Store or Google Play</li>
            <li>
                <div className='footer-img'>
                    <img src="/img/pay/app.jpg" alt="" />
                    <img src="/img/pay/play.jpg" alt="" />
                </div>
            </li>
            <li>Secured Payment Gateway</li>
            <li><img src="/img/pay/pay.png" alt="" className='pay'  /></li>
        </ul>
       </div>
    </div>
  )
}

export default Footer
