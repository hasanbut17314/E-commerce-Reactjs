import React, { useState } from 'react';
import { Container, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, Dialog, DialogContent, CircularProgress } from '@mui/material';
import AddImageField from './AddImageField';
import { useCreateCategoryMutation } from '../../services/categoryApi';
import notify from '../../utils/notify';

const AddCategoryForm = ({ open, close }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');

  const [addCategory, { isLoading }] = useCreateCategoryMutation();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('status', status);

    try {
      const response = await addCategory(formData).unwrap();
      notify.success(response.message);
      setTitle('');
      setDescription('');
      setImage(null);
      setStatus('');
      close();
    } catch (error) {
      notify.error(error.message || 'Something went wrong');
    }
  };

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogContent>
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
              <Box display="flex" justifyContent="flex-end" gap={2}>
                {!isLoading && (
                  <Button
                  variant="outlined"
                  color="primary"
                  onClick={close}
                >
                  Cancel
                </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              </Box>
            </Box>
          </form>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryForm;
