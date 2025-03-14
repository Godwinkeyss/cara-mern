import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import paypalLogo from '/img/pay/paypal.jpg'; // Add correct image paths
import stripeLogo from '/img/pay/stripe.avif';
import paystackLogo from '/img/pay/paystack.png';
import codLogo from '/img/pay/cod.jpg';
import { toast } from 'react-toastify';



const PaymentScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { shippingAddress, paymentMethod } } = state;

  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal');

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const handlePaymentChange = (e) => {
    const method = e.target.value;
    setPaymentMethod(method);
    toast.success(`Payment method selected: ${method}`, {
      position: 'top-center',
      autoClose: 2000, // Closes after 2 seconds
    });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethodName));
    navigate('/placeorder');
  };

  return (
    <div className="payment">
      <form onSubmit={submitHandler}>
      <div style={{ marginBottom: '20px' }}>
          <CheckoutSteps step1 step2 step3/>
        </div>
        <div className="form-container">
         
          <h1>Choose a Payment Method</h1>

          <div className="payment-options">
            {/* PayPal */}
            <div className="payment-option">
              <input
                type="radio"
                id="paypal"
                value="PayPal"
                checked={paymentMethodName === 'PayPal'}
                onChange={handlePaymentChange}
              />
              <label htmlFor="paypal">
                <img src={paypalLogo} alt="PayPal" />
              </label>
            </div>

            {/* Stripe */}
            <div className="payment-option">
              <input
                type="radio"
                id="stripe"
                value="Stripe"
                checked={paymentMethodName === 'Stripe'}
                onChange={handlePaymentChange}
              />
              <label htmlFor="stripe">
                <img src={stripeLogo} alt="Stripe" />
              </label>
            </div>

            {/* Paystack */}
            <div className="payment-option">
              <input
                type="radio"
                id="paystack"
                value="Paystack"
                checked={paymentMethodName === 'Paystack'}
                onChange={handlePaymentChange}
              />
              <label htmlFor="paystack">
                <img src={paystackLogo} alt="Paystack" />
              </label>
            </div>

            {/* Cash on Delivery */}
            <div className="payment-option">
              <input
                type="radio"
                id="cod"
                value="Cash on Delivery"
                checked={paymentMethodName === 'Cash on Delivery'}
                onChange={handlePaymentChange}
              />
              <label htmlFor="cod">
                <img src={codLogo} alt="Cash on Delivery" />
              </label>
            </div>
          </div>

          <div className="mb-3">
            <button className="btnCart" type="submit">Continue</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentScreen;