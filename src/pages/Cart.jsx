import React, { useState } from 'react';
import { IconButton, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 100, quantity: 1 },
    { id: 2, name: 'Product 2', price: 200, quantity: 1 },
  ]);

  const handleIncrement = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleEmptyCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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

      {cartItems.map((item) => (
        <div key={item.id} className="flex sm:flex-row flex-col justify-between items-center mb-4 p-4 border rounded-lg bg-white">
          <div className="flex sm:flex-row flex-col items-center">
            <img src={`https://via.placeholder.com/100`} alt={item.name} className="w-20 h-20 sm:mr-4 mr-0" />
            <div className='sm:mt-0 mt-2'>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2">${item.price.toFixed(2)}</Typography>
            </div>
          </div>
          <div className="flex items-center">
            <IconButton onClick={() => handleDecrement(item.id)}>
              <RemoveIcon />
            </IconButton>
            <Typography className="mx-3">
              {item.quantity}
            </Typography>
            <IconButton onClick={() => handleIncrement(item.id)}>
              <AddIcon />
            </IconButton>
          </div>
        </div>
      ))}

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
