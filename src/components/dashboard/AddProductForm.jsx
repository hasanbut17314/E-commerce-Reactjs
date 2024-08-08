import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, FormControlLabel, Checkbox, Dialog, DialogContent, CircularProgress, FormControl, Select, InputLabel } from '@mui/material';
import AddImageField from './AddImageField';
import { useCreateProductMutation } from '../../services/productApi';
import { useFetchCategoriesQuery } from '../../services/categoryApi';
import notify from '../../utils/notify';

const AddProductForm = ({ open, close }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [catId, setCatId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('Active');
  const [isFeatured, setIsFeatured] = useState(false);

  const { data: response, isLoading: isCategoriesLoading, } = useFetchCategoriesQuery();
  const categories = response?.data?.categories || [];
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('catId', catId);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('status', status);
    formData.append('isFeatured', isFeatured);

    try {
      await createProduct(formData).unwrap();
      notify.success('Product created successfully');
      close();
      setTitle('');
      setDescription('');
      setCatId('');
      setQuantity(0);
      setPrice(0);
      setImage(null);
      setStatus('Active');
      setIsFeatured(false);
    } catch (error) {
      notify.error(error.message || 'Something went wrong');
    }
  };

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <h2 className='font-semibold mb-2'>Add Product</h2>
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
            <InputLabel id="category-label">Category</InputLabel>
            <Select value={catId} onChange={(e) => setCatId(e.target.value)} labelId="category-label" label="Category">
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
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
              {isLoading ? <CircularProgress size={24} /> : 'Add Product'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductForm;
