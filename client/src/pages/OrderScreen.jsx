import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'; 
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51KqkMnE5lpMQPrl7CBn6Bgo1PGgRbA2vY0EUCiGWBuYxvQoNdzFp26vhRS5ojjQsv9wostxoRNaUSLiR19imaWvO00rVtJChKR');

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: { color: '#9e2146' },
  },
  hidePostalCode: true, // Hide postal code field if not needed
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}

export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [clientSecret, setClientSecret] = useState('');
  const [payresult, setPayresult] = useState('');
  
  const stripe = useStripe();   // Ensure useStripe hook is used
  const elements = useElements();
  const [showCardForm, setShowCardForm] = useState(false)
  const params = useParams();
  const { id: orderId } = params;

  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
    loadingPay: false,
  });
   
    // PayPal order creation
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice.toFixed(2) },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  // PayPal payment approval
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `http://127.0.0.1:5000/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }

  // PayPal error handler
  function onError(err) {
    toast.error(getError(err));
  }

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();



  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`http://127.0.0.1:5000/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });

        if (!data.isPaid && data.paymentMethod === 'Stripe') {
          try {
            // Make a POST request to the server to create a Stripe PaymentIntent
            const { data: stripeData } = await axios.post(
              `http://127.0.0.1:5000/api/orders/${orderId}/stripe-client-secret`,
              {},
              {
                headers: { authorization: `Bearer ${userInfo.token}` },
              }
            );
            setClientSecret(stripeData.clientSecret);
          } catch (error) {
            console.error('Error getting client secret:', error);
          }
        }
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    }else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('http://127.0.0.1:5000/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'GBP',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, userInfo, orderId, navigate, successPay,paypalDispatch, successDeliver]);

  const handleStripePayment = async (e) => {
    e.preventDefault();
    
    // Ensure stripe and elements are both available
    if (!stripe || !elements) {
      toast.error("Stripe.js has not loaded yet.");
      return;
    }
  
    // Get the CardElement component
    const cardElement = elements.getElement(CardElement);
  
    // Log to check if CardElement is available
    console.log('CardElement:', cardElement);
  
    // Check if cardElement is available
    if (!cardElement) {
      toast.error("Card details are required to proceed with payment.");
      return;
    }
  
    try {
      // Confirm the payment with the PaymentIntent
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,  // Ensure this is a valid element
        },
      });
  
      if (error) {
        toast.error(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        // Send the payment confirmation to the backend
        const { data } = await axios.put(
          `http://127.0.0.1:5000/api/orders/${orderId}/pay`,
          {
            id: paymentIntent.id, // The paymentIntent ID
            status: paymentIntent.status,
          },
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success('Payment successful!');
       
        setShowCardForm(false);
        // Optionally, navigate to the order confirmation page
        navigate(`/order/${orderId}`);
      }
    } catch (err) {
      toast.error(`Payment failed: ${err.message}`);
    }
  };
  
  useEffect(() => {
    const pollOrderStatus = async () => {
      const intervalId = setInterval(async () => {
        const { data } = await axios.get(`http://127.0.0.1:5000/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        
        if (data.isPaid) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
          clearInterval(intervalId);  // Stop polling once the order is paid
        }
      }, 5000);  // Poll every 5 seconds
  
      return () => clearInterval(intervalId);  // Cleanup on component unmount
    };
  
    if (order._id && !order.isPaid) {
      pollOrderStatus();
    }
  
  }, [order, userInfo, orderId, dispatch]);
  

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="placeorder section-p1">
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="secondary">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod} <br />
                {!order.isPaid && <Link to={`/payment`}>Edit</Link>}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="secondary">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        {!order.isPaid ?<Link to={`/product/${item.slug}`}>{item.name}</Link>:item.name}
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>£{item.price.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>£{order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>£{order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>£{order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col><strong>Order Total</strong></Col>
                    <Col><strong>£{order.totalPrice.toFixed(2)}</strong></Col>
                  </Row>
                </ListGroup.Item>

                {/* PayPal Button */}
              {!order.isPaid && order.paymentMethod === 'PayPal' && (
                <div>
                  {isPending ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  )}
                </div>
              )}

                {!order.isPaid && order.paymentMethod === 'Stripe' && (
                  // <ListGroup.Item>
                  //   <Form onSubmit={handleStripePayment}>
                  //     <Button type="submit" className="w-100" disabled={loadingPay}>
                  //       {loadingPay ? 'Processing...' : 'Pay with Stripe'}
                  //     </Button>
                  //   </Form>
                  // </ListGroup.Item>
                  <ListGroup.Item>
                  {!showCardForm ? (
                    <Button onClick={() => setShowCardForm(true)} className="w-100">
                      Pay Now
                    </Button>
                  ) : (
                    <Modal show={showCardForm} onHide={() => setShowCardForm(false)} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Enter Card Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {/* 🟢 Wrap with Elements */}
                        {clientSecret && (
                         
                            <form onSubmit={handleStripePayment} className="stripe-form">
                              <div className="stripe-input-container">
                                <CardElement className="stripe-input" options={cardElementOptions} />
                              </div>
                              <Button type="submit" className="w-100 mt-3">
                                Pay
                              </Button>
                            </form>
                         
                        )}
                      </Modal.Body>
                    </Modal>
                  )}
                </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
