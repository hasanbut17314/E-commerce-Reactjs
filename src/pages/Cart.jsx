import React from 'react';
import {
  IconButton,
  Typography,
  Button,
  Skeleton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Delete from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import notify from '../utils/notify';
import { useGetCartQuery } from '../services/cartApi';
import { useDeleteItemFromCartMutation } from '../services/cartApi';

const Cart = () => {
  const { data: response, isLoading, error } = useGetCartQuery();
  const cart = response?.data || {};
  const cartItems = response?.data?.prod_items || [];

  const [deleteItem, {isLoading: isRemoving}] = useDeleteItemFromCartMutation();

  const handleEmptyCart = () => {
    // Implement empty cart functionality
  };

  const handleRemoveItem = async (id) => {
    try {
      await deleteItem({ prod_id: id }).unwrap();
      notify.success('Product removed from cart successfully!');
    } catch (err) {
      notify.error(err.message || 'Something went wrong! Please try again.');
    }
  };

  const handleDecrement = (id) => {
    // Implement decrement quantity functionality
  };

  const handleIncrement = (id) => {
    // Implement increment quantity functionality
  };

  if (isLoading) {
    return (
      <div className="px-6 pb-5 pt-14 max-w-4xl mx-auto">
        {[1, 2, 3].map((item) => (
          <Box key={item} mb={2}>
            <div
              key={item._id}
              className="flex sm:flex-row flex-col items-center mb-4 p-4 border rounded-lg bg-white shadow-md"
            >
              <Skeleton variant="rectangular" height='80px' width='80px' />
              <div className='sm:mt-0 mt-2 sm:w-auto w-full sm:ml-3'>
                <Skeleton variant="rectangular" height='20px' width='300px' />
                <Skeleton variant="rectangular" height='10px' width='50px' sx={{ mt: 1 }} />
              </div>
            </div>

          </Box>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Failed to load cart: {error.message}
      </Typography>
    );
  }

  return (
    <div className="px-6 pb-5 pt-14 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 600 }}>
          Shopping Cart
        </Typography>
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
          <div
            key={item._id}
            className="flex sm:flex-row flex-col justify-between items-center mb-4 p-4 border rounded-lg bg-white shadow-md"
          >
            <div className="flex sm:flex-row flex-col items-center sm:w-3/4 w-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 sm:mr-4 mb-4 sm:mb-0 object-cover"
              />
              <div className="sm:mt-0 mt-2 sm:w-auto w-full truncate">
                <Typography
                  variant="body1"
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: 500,
                    mr: { xs: 0, sm: 2 },
                  }}
                >
                  <Link to={`/product/${item.prod_id}`}>
                    {item.title}
                  </Link>
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  ${item.price.toFixed(2)}
                </Typography>
              </div>
            </div>

            <div className="flex items-center sm:w-auto w-full sm:justify-start justify-between mt-4 sm:mt-0">
              <div className="flex items-center border rounded-md bg-gray-100 px-2 py-1">
                <IconButton
                  size="small"
                  onClick={() => handleDecrement(item.prod_id)}
                  sx={{ padding: '3px', color: 'black' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography className="mx-3 px-2">{item.quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => handleIncrement(item.prod_id)}
                  sx={{ padding: '3px', color: 'black' }}
                >
                  <AddIcon />
                </IconButton>
              </div>
              <IconButton
                onClick={() => handleRemoveItem(item.prod_id)}
                sx={{
                  marginLeft: '16px',
                  color: 'red',
                }}
                disabled={isRemoving}
              >
                <Delete />
              </IconButton>
            </div>
          </div>
        ))
      ) : (
        <Typography>No items in cart.</Typography>
      )}

      <div className="flex justify-between items-center mt-6">
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
          Total: <p className='text-blue-700 font-bold ms-2'>${cart.total_price?.toFixed(2)}</p>
        </Typography>
        <Link to="/checkout">
          <Button variant="contained" color="primary">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
