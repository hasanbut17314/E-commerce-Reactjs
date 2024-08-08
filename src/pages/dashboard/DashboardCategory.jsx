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
  Menu,
  MenuItem,
  IconButton,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCategoryForm from '../../components/dashboard/AddCategoryForm';
import EditCategoryForm from '../../components/dashboard/EditCategoryForm';
import { useFetchCategoriesQuery } from '../../services/categoryApi';
import { useDeleteCategoryMutation } from '../../services/categoryApi';
import notify from '../../utils/notify';

const Categories = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDel, setOpenDel] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = (_, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    setOpenAdd(false);
  };

  const handleOpenEdit = (category) => {
    setSelectedCategory(category);
    setOpenEdit(true);
  };

  const handleCloseEdit = (_, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
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

  const handleDelClose = (_, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    setOpenDel(false);
    setSelectedCategory(null);
  };

  const delPressed = () => {
    handleMenuClose();
    setOpenDel(true);
  };

  const [deleteCategory, { isLoading: delLoading }] = useDeleteCategoryMutation();

  const handleDeleteClick = async () => {
    try {
      await deleteCategory(selectedCategory._id).unwrap();
      notify.success('Category deleted successfully');
    } catch (error) {
      notify.error(error.message || 'Something went wrong');
    } finally {
      handleDelClose();
    }
  };

  const { data: response, isLoading, error } = useFetchCategoriesQuery({
    page: page + 1,
    limit: rowsPerPage,
  });

  const categories = response?.data?.categories || [];
  const totalCategories = response?.data?.pagination?.total || 0;

  if (isLoading) {
    return <div className='flex justify-center mx-auto mt-40'>
      <CircularProgress size={60} />
    </div>
  }

  if (error) {
    return <div className='flex justify-center mx-auto mt-40'>
      <Typography variant="h6" color="error">
        {error.message || 'Something went wrong'}
      </Typography>
    </div>;
  }

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
            {categories.map((category) => (
              <TableRow key={category._id}>
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
                    <MenuItem onClick={delPressed}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCategories}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />

      <AddCategoryForm open={openAdd} close={handleCloseAdd} />

      <EditCategoryForm category={selectedCategory} open={openEdit} close={handleCloseEdit} />

      <Dialog
        open={openDel}
        onClose={handleDelClose}
      >
        <DialogTitle textAlign={'center'}>
          {"Confirm Deletion !!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign={'center'}>
            Are you sure you want to delete {selectedCategory?.title} category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 3 }}>
          {!delLoading && <Button onClick={handleDelClose} color="primary" variant='outlined'>
            Cancel
          </Button>}
          <Button onClick={handleDeleteClick} color="error" variant='contained' autoFocus disabled={delLoading}>
            {delLoading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Categories;
