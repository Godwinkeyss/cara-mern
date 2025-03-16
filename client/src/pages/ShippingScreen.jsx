import { useState, useContext, useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const ShippingScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart: { shippingAddress } } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postCode, setPostCode] = useState(shippingAddress.postCode || '');  // Fixed key name
  const [country, setCountry] = useState(shippingAddress.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postCode, country },
    });

    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ fullName, address, city, postCode, country })
    );

    navigate('/payment');
  };
  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only once when the page loads


  return (
    <div className="shipping">
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <CheckoutSteps step1 step2 />
        </div>
        <div className="form-container">
          <h1>Shipping Address</h1>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}  // Fixed value
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}  // Fixed value
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}  // Fixed value
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="postcode">Post Code</label>
            <input
              type="text"
              id="postcode"
              value={postCode}  // Fixed value
              onChange={(e) => setPostCode(e.target.value)}
              placeholder="Enter your post code"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              value={country}  // Fixed value
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter your country"
              required
            />
          </div>

          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default ShippingScreen;
