import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import {
  isAdmin,
  isAuth,
  
} from '../utils/getToken.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { stripe } from '../server.js';





const orderRouter = express.Router();



orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(process.env.STRIPE_SECRET_KEY)
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: 'Order Delivered' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);


// Route to create Stripe payment intent
orderRouter.post('/create-stripe-payment', isAuth, async (req, res) => {
  try {
    const { orderId, amount } = req.body; // orderId and the amount to be paid

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }

    // Create the payment intent using Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe accepts amount in cents
      currency: 'gbp',      // Specify the currency (USD in this case)
    });

    // Save the payment intent ID in the order document
    order.paymentIntentId = paymentIntent.id;
    await order.save();

    // Return the client secret to the frontend
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ message: 'Error creating payment intent' });
  }
});



orderRouter.post('/:orderId/stripe-client-secret', async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId); // Find the order by ID

  if (!order) {
    return res.status(404).send({ message: 'Order not found' });
  }

  if (order.isPaid) {
    return res.status(400).send({ message: 'Order already paid' });
  }

  try {
    // Create a PaymentIntent with the order's total amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100), // Amount in the smallest currency unit (e.g., cents)
      currency: 'usd', // You can dynamically set this based on the order's currency
    });

    // Save the PaymentIntent ID in the order
    order.paymentIntentId = paymentIntent.id; // Save the PaymentIntent ID to the order
    await order.save(); // Save the updated order

    // Send the clientSecret back to the client
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});




orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      // Get the order from the database
      const order = await Order.findById(req.params.id).populate('user', 'email name');
    
      if (!order) {
        return res.status(404).send({ message: 'Order Not Found' });
      }

      console.log('Received Payment Data:', req.body);

      // Check which payment method is used
      if (order.paymentMethod === 'PayPal') {
        // 🔹 Handle PayPal Payment
        const { status, update_time, payer, purchase_units } = req.body;

        if (!status || !update_time || !payer || !purchase_units || !purchase_units[0]?.amount?.value) {
          return res.status(400).send({ message: 'Invalid PayPal payment data' });
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.params.id,
          status,
          update_time,
          email_address: payer.email_address,
        };

        const updatedOrder = await order.save();
        return res.send({ message: 'Order Paid via PayPal', order: updatedOrder });

      } else if (order.paymentMethod === 'Stripe') {
        // 🔹 Handle Stripe Payment

        // Check if the request body has the expected data for Stripe payment
        const { id: paymentIntentId, status } = req.body;

        if (!paymentIntentId || !status) {
          return res.status(400).send({ message: 'Invalid Stripe payment data' });
        }

        // Fetch the paymentIntent to confirm the payment if necessary
        // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        // Confirm payment if necessary (optional depending on Stripe setup)
        if (paymentIntent.status === 'succeeded') {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            id: paymentIntent.id,
            status: paymentIntent.status,
            email_address: order.user.email,
          };

          const updatedOrder = await order.save();
          return res.send({ message: 'Order Paid via Stripe', order: updatedOrder });
        } else if (paymentIntent.status === 'requires_payment_method') {
          // Handle the case where the payment requires a new payment method
          return res.status(400).send({ message: 'Payment method required' });
        } else if (paymentIntent.status === 'requires_confirmation') {
          // Confirm the PaymentIntent if it requires confirmation
          try {
            const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
            if (confirmedPaymentIntent.status === 'succeeded') {
              order.isPaid = true;
              order.paidAt = Date.now();
              order.paymentResult = {
                id: confirmedPaymentIntent.id,
                status: confirmedPaymentIntent.status,
                email_address: order.user.email,
              };

              const updatedOrder = await order.save();
              return res.send({ message: 'Order Paid via Stripe', order: updatedOrder });
            } else {
              return res.status(400).send({ message: 'Stripe payment not successful' });
            }
          } catch (error) {
            console.error('Error confirming payment:', error);
            return res.status(500).send({ message: 'Error confirming payment with Stripe' });
          }
        } else {
          return res.status(400).send({ message: 'Stripe payment not successful' });
        }
      } else {
        // If neither PayPal nor Stripe is used, return an error
        return res.status(400).send({ message: 'Invalid payment method' });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).send({ message: 'Error processing payment' });
    }
  })
);




orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.send({ message: 'Order Deleted' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter;