import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  Dialog,
  DialogContent,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCategoryForm from '../../components/dashboard/AddCategoryForm';
import EditCategoryForm from '../../components/dashboard/EditCategoryForm';

const dummyCategories = [
  { id: 1, title: 'Category 1', status: 'Active', image: 'https://via.placeholder.com/120' },
  { id: 2, title: 'Category 2', status: 'Hidden', image: 'https://via.placeholder.com/120' },
  { id: 3, title: 'Category 3', status: 'Active', image: 'https://via.placeholder.com/120' },
  { id: 4, title: 'Category 4', status: 'Hidden', image: 'https://via.placeholder.com/120' },
  { id: 5, title: 'Category 5', status: 'Active', image: 'https://via.placeholder.com/120' },
  { id: 6, title: 'Category 6', status: 'Active', image: 'https://via.placeholder.com/120' },
  { id: 7, title: 'Category 7', status: 'Hidden', image: 'https://via.placeholder.com/120' },
  { id: 8, title: 'Category 8', status: 'Active', image: 'https://via.placeholder.com/120' },
  { id: 9, title: 'Category 9', status: 'Hidden', image: 'https://via.placeholder.com/120' },
  { id: 10, title: 'Category 10', status: 'Active', image: 'https://via.placeholder.com/120' },
  { id: 11, title: 'Category 11', status: 'Hidden', image: 'https://via.placeholder.com/120' },
  { id: 12, title: 'Category 12', status: 'Active', image: 'https://via.placeholder.com/120' },
];

const Categories = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenEdit = (category) => {
    setSelectedCategory(category);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedCategory(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleMenuClose();
    handleOpenEdit(selectedCategory);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    // Add your delete logic here
    console.log(`Delete category: ${selectedCategory.title}`);
  };

  return (
    <Box sx={{ px: { xs: 0, sm: 2 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>Categories</Typography>
        <Button onClick={handleOpenAdd} variant="contained" color="primary" startIcon={<AddIcon />}>
          Add Category
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
              <TableRow key={category.id}>
                <TableCell><img src={category.image} alt={category.title} style={{ width: 60, height: 60 }} /></TableCell>
                <TableCell>{category.title}</TableCell>
                <TableCell>{category.status}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      setSelectedCategory(category);
                      handleMenuClick(event);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                    <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={dummyCategories.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[4, 8, 12]}
      />
      <Dialog open={openAdd} onClose={handleCloseAdd} fullWidth maxWidth="sm">
        <DialogContent>
          <AddCategoryForm />
        </DialogContent>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogContent>
          <EditCategoryForm category={selectedCategory} onClose={handleCloseEdit} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Categories;
