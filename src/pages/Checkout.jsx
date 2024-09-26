import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box, Skeleton } from '@mui/material';
import { useGetCartQuery } from '../services/cartApi';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51OxGADFV91DGcS0ZuYeVBdudNIczWpShNMnGzsMZxkn7xsl1XAnpyXtjcK9ppU23L2KCmmpTONgslCVZwGlmcyuK00bxTgv7Xu');

const CheckoutForm = ({ totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      // Use the client secret from the backend after creating the PaymentIntent
      localStorage.getItem('clientSecret'),
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name',
            email: 'Customer Email',
          },
        },
      }
    );

    if (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    } else {
      // Payment successful, now handle post-payment actions
      alert("Payment successful!");
      // Add the order to the database and redirect user
      // addOrderToDB(paymentIntent); // Implement this function
      // Redirect user, e.g., to order summary page
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button variant="contained" color="primary" type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
      </Button>
    </form>
  );
};

const Checkout = () => {
  const { data: response, isLoading } = useGetCartQuery();
  const cartItems = response?.data?.cart.prod_items || [];
  const totalPrice = response?.data?.cart.total_price || 0;
  
  const [isPaymentFormVisible, setPaymentFormVisible] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleProceedToPayment = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/order/stripePayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalPrice * 100 }), // Convert dollars to cents
      });
      const data = await response.json();
      localStorage.setItem('clientSecret', data.clientSecret); // Save client secret to process the payment

      setPaymentFormVisible(true); // Show payment form after initiating the payment intent
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg" className="mt-10">
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <Paper elevation={3} className="p-6">
          <Typography variant="h6" mb={3} className="text-center">Order Summary</Typography>
          {isLoading ? (
            [1, 2].map((_, index) => (
              <Box key={index} className="flex justify-between items-center mb-4">
                <Skeleton variant="rectangular" width={60} height={60} />
                <Box className="ml-4" sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
                <Skeleton sx={{ display: { xs: 'none', sm: 'block' }}} variant="text" width="50px" />
              </Box>
            ))
          ) : (
            cartItems.map((item) => (
              <Box key={item.prod_id} className="flex justify-between items-center mb-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                <Box className="ml-4 flex-grow">
                  <Typography variant="body1" sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    ${item.price.toFixed(2)} x {item.quantity}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500, display: { xs: 'none', sm: 'block' } }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))
          )}
          <Box className="flex justify-between items-center mt-6">
            <Typography variant="h6">Total:</Typography>
            {isLoading ? <Skeleton variant="text" width="80px" /> : <Typography variant="h6" fontWeight={600}>${totalPrice.toFixed(2)}</Typography>}
          </Box>
        </Paper>

        {/* Checkout Form */}
        <Paper elevation={3} className="p-6">
          <Typography variant="h6" mb={2} className="text-center">Checkout</Typography>
          <form className="flex flex-col gap-4">
            <TextField label="Name" variant="outlined" fullWidth name="name" value={form.name} onChange={handleChange} />
            <TextField label="Email" variant="outlined" fullWidth name="email" value={form.email} onChange={handleChange} />
            <TextField label="Address" variant="outlined" fullWidth name="address" value={form.address} onChange={handleChange} />
            <TextField label="Contact Number" variant="outlined" fullWidth name="contact" value={form.contact} onChange={handleChange} />
          </form>
          <Box className="flex justify-center mt-6">
            <Button variant="contained" color="primary" onClick={handleProceedToPayment}>
              Proceed to Payment
            </Button>
          </Box>
          {isPaymentFormVisible && (
            <Elements stripe={stripePromise}>
              <CheckoutForm totalPrice={totalPrice} />
            </Elements>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Checkout;
