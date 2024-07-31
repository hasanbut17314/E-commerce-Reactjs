import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box } from '@mui/material';

const Checkout = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
  });

  const cartItems = [
    { id: 1, name: 'Product 1', price: 100, quantity: 1 },
    { id: 2, name: 'Product 2', price: 200, quantity: 2 },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
          {cartItems.map((item) => (
            <Box key={item.id} className="flex justify-between items-center mb-4">
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body1">${item.price.toFixed(2)} x {item.quantity}</Typography>
              <Typography variant="body1">${(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}
          <Box className="flex justify-between items-center mt-6">
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
          </Box>
        </Paper>
        
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
