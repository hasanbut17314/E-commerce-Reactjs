import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, FormControlLabel, Checkbox } from '@mui/material';

const AddProductForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [catId, setCatId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('Active');
  const [isFeatured, setIsFeatured] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle add product logic here
  };

  return (
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
      <TextField
        label="Category ID"
        variant="outlined"
        value={catId}
        onChange={(e) => setCatId(e.target.value)}
        fullWidth
        required
      />
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
      <Button variant="contained" component="label">
        Upload Image
        <input type="file" hidden onChange={handleImageChange} />
      </Button>
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
      <FormControlLabel
        control={<Checkbox checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />}
        label="Featured"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Product
      </Button>
    </Box>
  );
};

export default AddProductForm;
