import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import { StoreProvider } from './Store';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51KqkMnE5lpMQPrl7CBn6Bgo1PGgRbA2vY0EUCiGWBuYxvQoNdzFp26vhRS5ojjQsv9wostxoRNaUSLiR19imaWvO00rVtJChKR'); // Replace with your Stripe public key

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
        <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </StrictMode>
);
