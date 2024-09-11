import React, { useState } from 'react';
import {
  IconButton,
  Typography,
  Button,
  Skeleton,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Delete from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import notify from '../utils/notify';
import { useGetCartQuery } from '../services/cartApi';
import { useDeleteItemFromCartMutation } from '../services/cartApi';
import { useEmptyCartMutation } from '../services/cartApi';
import { useUpdateItemQuantityMutation } from '../services/cartApi';

const Cart = () => {

  const [openEmpty, setOpenEmpty] = useState(false);

  const { data: response, isLoading, error } = useGetCartQuery();
  const cart = response?.data?.cart || {};
  const cartItems = response?.data?.cart.prod_items || [];
  const total = response?.data?.total < 1;

  const [deleteItem, { isLoading: isRemoving }] = useDeleteItemFromCartMutation();

  const [emptyCart, { isLoading: emptyLoading }] = useEmptyCartMutation();

  const [updateItemQuantity, { isLoading: isUpdating }] = useUpdateItemQuantityMutation();

  const handleEmptyCart = () => {
    setOpenEmpty(true);
  };

  const handleEmptyClose = () => {
    setOpenEmpty(false);
  };

  const handleEmptyClick = async () => {
    try {
      await emptyCart().unwrap();
      notify.success('Cart emptied successfully!');
      handleEmptyClose();
    } catch (error) {
      notify.error(error.message || 'Something went wrong! Please try again.');
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await deleteItem({ prod_id: id }).unwrap();
      notify.success('Product removed from cart successfully!');
    } catch (err) {
      notify.error(err.message || 'Something went wrong! Please try again.');
    }
  };

  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      const updateDetails = { prod_id: id, quantity: quantity - 1 };
      updateItemQuantity(updateDetails)
    }
  };

  const handleIncrement = (id, quantity) => {
      const updateDetails = { prod_id: id, quantity: quantity + 1 };
      updateItemQuantity(updateDetails)
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
          disabled={total}
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
                  onClick={() => handleDecrement(item.prod_id, item.quantity)}
                  sx={{ padding: '3px', color: 'black' }}
                  disabled={isUpdating}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography className="mx-3 px-2">{item.quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => handleIncrement(item.prod_id, item.quantity)}
                  sx={{ padding: '3px', color: 'black' }}
                  disabled={isUpdating}
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
        <Button variant="contained" color="primary" disabled={total}>
          <Link to="/checkout">
            Checkout
          </Link>
        </Button>
      </div>

      <Dialog
        open={openEmpty}
        onClose={handleEmptyClose}
      >
        <DialogTitle textAlign={'center'}>
          Empty Cart !
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign={'center'}>
            Are you sure you want to empty your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 3 }}>
          {!emptyLoading && <Button onClick={handleEmptyClose} color="primary" variant='outlined'>
            Cancel
          </Button>}
          <Button onClick={handleEmptyClick} color="error" variant='contained' autoFocus disabled={emptyLoading}>
            {emptyLoading ? <CircularProgress size={24} /> : 'Empty'}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Cart;
