import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Pagination, Dialog, DialogTitle, DialogContent } from '@mui/material';
import CategoryCard from '../../components/dashboard/CategoryCard';
import AddCategoryForm from '../../components/dashboard/AddCategoryForm';
import AddIcon from '@mui/icons-material/Add';

const dummyCategories = [
  { id: 1, title: 'Category 1', description: 'Description 1', image: 'https://via.placeholder.com/120' },
  { id: 2, title: 'Category 2', description: 'Description 2', image: 'https://via.placeholder.com/120' },
  { id: 3, title: 'Category 3', description: 'Description 3', image: 'https://via.placeholder.com/120' },
  { id: 4, title: 'Category 4', description: 'Description 4', image: 'https://via.placeholder.com/120' },
  { id: 5, title: 'Category 5', description: 'Description 5', image: 'https://via.placeholder.com/120' },
  { id: 6, title: 'Category 6', description: 'Description 6', image: 'https://via.placeholder.com/120' },
  { id: 7, title: 'Category 7', description: 'Description 7', image: 'https://via.placeholder.com/120' },
  { id: 8, title: 'Category 8', description: 'Description 8', image: 'https://via.placeholder.com/120' },
  { id: 9, title: 'Category 9', description: 'Description 9', image: 'https://via.placeholder.com/120' },
  { id: 10, title: 'Category 10', description: 'Description 10', image: 'https://via.placeholder.com/120' },
  { id: 11, title: 'Category 11', description: 'Description 11', image: 'https://via.placeholder.com/120' },
  { id: 12, title: 'Category 12', description: 'Description 12', image: 'https://via.placeholder.com/120' },
];

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(dummyCategories.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedCategories = dummyCategories.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ px: {xs: 0, sm: 2}}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>Categories</Typography>
        <Button onClick={handleClickOpen} variant="contained" color="primary" startIcon={<AddIcon />}>
          Add Category
        </Button>
      </Box>
      <Grid container spacing={3}>
        {paginatedCategories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <AddCategoryForm />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Categories;
