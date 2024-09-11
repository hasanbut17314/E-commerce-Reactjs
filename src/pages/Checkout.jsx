import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box, Skeleton } from '@mui/material';
import { useGetCartQuery } from '../services/cartApi';

const Checkout = () => {

  const { data: response, isLoading } = useGetCartQuery();
  const cartItems = response?.data?.cart.prod_items || [];
  const totalPrice = response?.data?.cart.total_price || 0;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(form);
  };

  return (
    <Container maxWidth="lg" className="mt-10">
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <Paper elevation={3} className="p-6">
          <Typography variant="h6" mb={3} className="text-center">
            Order Summary
          </Typography>

          {isLoading ? (
            [1, 2, 3].map((_, index) => (
              <Box key={index} className="flex justify-between items-center mb-4">
                <Skeleton variant="rectangular" width={60} height={60} />
                <Box className="ml-4" sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
                <Skeleton variant="text" width="50px" />
              </Box>
            ))
          ) : (
            cartItems.map((item) => (
              <Box key={item.prod_id} className="flex justify-between items-center mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <Box className="ml-4 flex-grow">
                  <Typography
                    variant="body1"
                    sx={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontWeight: 500,
                      mr: { xs: 0, sm: 2 },
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                  >
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
            {isLoading ? (
              <Skeleton variant="text" width="80px" />
            ) : (
              <Typography variant="h6" classes={{ root: 'text-blue-700' }} fontWeight={600}>${totalPrice.toFixed(2)}</Typography>
            )}
          </Box>
        </Paper>

        {/* Checkout Form */}
        <Paper elevation={3} className="p-6">
          <Typography variant="h6" mb={2} className="text-center">
            Checkout
          </Typography>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              name="contact"
              value={form.contact}
              onChange={handleChange}
            />
            <Box className="flex justify-center mt-6">
              <Button variant="contained" color="primary" type="submit">
                Proceed to Payment
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Checkout;
