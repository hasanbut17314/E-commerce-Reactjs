import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, MenuItem, FormControlLabel, Checkbox, FormControl, Select, InputLabel, Dialog, DialogContent, CircularProgress } from '@mui/material';
import AddImageField from './AddImageField';
import { useFetchCategoriesQuery } from '../../services/categoryApi';
import { useUpdateProductMutation } from '../../services/productApi';
import notify from '../../utils/notify';

const EditProductForm = ({ product, open, close }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cat_id, setcat_id] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('Active');
  const [isFeatured, setIsFeatured] = useState(false);

  const { data: response, isLoading: isCategoriesLoading, } = useFetchCategoriesQuery();
  const categories = response?.data?.categories || [];

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('cat_id', cat_id);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('status', status);
    formData.append('isFeatured', isFeatured);

    try {
      await updateProduct({ id: product._id, formData }).unwrap();
      notify.success('Product updated successfully');
      close();
    } catch (error) {
      notify.error(error.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setcat_id(product.cat_id);
      setQuantity(product.quantity);
      setPrice(product.price);
      setImage(product.image);
      setStatus(product.status);
      setIsFeatured(product.isFeatured);
    }
  }, [product]);

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <h2 className='font-semibold mb-2'>Update Product</h2>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={cat_id}
              label="Category"
              onChange={(e) => setcat_id(e.target.value)}
              required
            >
              {categories.map((category) => (
                <MenuItem
                  key={category._id}
                  value={category._id}
                  selected={category._id === cat_id}
                >
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value >= 0 ? e.target.value : 0)}
            fullWidth
          />
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value >= 0 ? e.target.value : 0)}
            fullWidth
            required
          />
          <TextField
            label="Status"
            variant="outlined"
            select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            required
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Hidden">Hidden</MenuItem>
          </TextField>
          <AddImageField onFileSelect={(file) => setImage(file)} />
          <FormControlLabel
            control={<Checkbox checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />}
            label="Featured"
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {!isLoading && <Button onClick={close} variant='outlined'>Cancel</Button>}
            <Button type="submit" variant="contained" color="primary" disabled={isLoading || isCategoriesLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Update'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductForm;
