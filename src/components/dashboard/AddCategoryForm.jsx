import React, { useState } from 'react';
import { Container, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddImageField from './AddImageField';

const AddCategoryForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Category Added:', { title, description, image });
    // Reset form fields
    setTitle('');
    setDescription('');
    setImage(null);
    // Navigate back to categories page
    navigate('/dashboard/categories');
  };

  return (
    <Container maxWidth="sm">
      <h2 className='font-semibold mb-2'>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
            required
          />
          <FormControl fullWidth required>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              value={status}
              label="Status *"
              onChange={handleStatusChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value='Active'>Active</MenuItem>
              <MenuItem value='Hidden'>Hidden</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
            required
            multiline
            rows={4}
          />
          <AddImageField onFileSelect={(file) => setImage(file)} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Add Category
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddCategoryForm;
