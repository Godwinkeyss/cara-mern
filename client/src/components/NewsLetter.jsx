import React from 'react'

const NewsLetter = () => {
  return (
    <div className='news-letter section-p1 section-m1'>
      <div className='news-left'>
      <h4>Sign Up For Newsletter</h4>
      <p> Get Email updates about our latest shop and <span>special offer</span></p>
      </div>
      <div className='news-right'>
        <input type="text" placeholder='Your email address ' className='input' /> 
        <button>Sign Up</button>
      </div>
    </div>
  )
}

export default NewsLetter
