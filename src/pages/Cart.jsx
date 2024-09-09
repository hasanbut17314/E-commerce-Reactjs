import React from 'react';
import { IconButton, Typography, Button, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import { useGetCartQuery } from '../services/cartApi';

const Cart = () => {
  const { data: response, isLoading, error } = useGetCartQuery();
  const cartItems = response?.data?.prod_items || [];

  // Dummy total price calculation
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Failed to load cart: {error.message}</Typography>;
  }

  const handleEmptyCart = () => {
    // Implement empty cart functionality
  };

  const handleDecrement = (id) => {
    // Implement decrement quantity functionality
  };

  const handleIncrement = (id) => {
    // Implement increment quantity functionality
  };

  return (
    <div className="px-6 pb-5 pt-14 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 600 }}>Shopping Cart</Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleEmptyCart}
        >
          Empty Cart
        </Button>
      </div>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item._id} className="flex sm:flex-row flex-col justify-between items-center mb-4 p-4 border rounded-lg bg-white">
            <div className="flex sm:flex-row flex-col items-center">
              <img src={`https://via.placeholder.com/100`} alt={item.name} className="w-20 h-20 sm:mr-4 mr-0" />
              <div className='sm:mt-0 mt-2'>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2">${item.price.toFixed(2)}</Typography>
              </div>
            </div>
            <div className="flex items-center">
              <IconButton onClick={() => handleDecrement(item._id)}>
                <RemoveIcon />
              </IconButton>
              <Typography className="mx-3">
                {item.quantity}
              </Typography>
              <IconButton onClick={() => handleIncrement(item._id)}>
                <AddIcon />
              </IconButton>
            </div>
          </div>
        ))
      ) : (
        <Typography>No items in cart.</Typography>
      )}

      <div className="flex justify-between items-center mt-6">
        <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
        <Link to='/checkout'>
          <Button variant="contained" color="primary">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
