import React, { useState } from 'react'

const Header = () => {
  const [open, setIsOpen] = useState(false);
  console.log(open)
  return (
    <div>
      <section className='header'>
        <a><img src='/img/logo.png'  /></a>
        <div>
          <ul className='navbar'>
            <li><a className='active' href="">Home</a></li>
            <li><a href="">Product</a></li>
            <li><a href="">Blog</a></li>
            <li><a href="">About</a></li>
            
          </ul>
        </div>
        <div className='ham' ><i className="fa-solid fa-bars bug " onClick={()=>setIsOpen(!open)}></i></div>
        {open &&
        <div className='navbar-small'>
        <ul className='nav'>
            <li><a className='active' href="">Home</a></li>
            <li><a href="">Product</a></li>
            <li><a href="">Blog</a></li>
            <li><a href="">About</a></li>
            
          </ul>
        </div>
}
      </section>
    </div>
  )
}

export default Header
