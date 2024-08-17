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
  DialogTitle,
  DialogActions,
  DialogContentText,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddProductForm from '../../components/dashboard/AddProductForm';
import EditProductForm from '../../components/dashboard/EditProductForm';
import { useFetchProductsQuery } from '../../services/productApi';
import { useDeleteProductMutation } from '../../services/productApi';
import notify from '../../utils/notify';

const AdminProducts = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDel, setOpenDel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: response, isLoading, error } = useFetchProductsQuery({
    page: page + 1,
    limit: rowsPerPage,
  });
  const products = response?.data?.products || [];
  const totalProducts = response?.data?.pagination.total || 0;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = (_, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    setOpenAdd(false);
  };

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
    setAnchorEl(null);
  };

  const handleCloseUpdate = (_, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    setOpenUpdate(false);
    setSelectedProduct(null);
  };

  const handleMenuClick = (event, product) => {
    setSelectedProduct(product);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelClose = (_, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    setOpenDel(false);
    setSelectedProduct(null);
  };

  const delPressed = () => {
    handleMenuClose();
    setOpenDel(true);
  };

  const [deleteProduct, { isLoading: delLoading }] = useDeleteProductMutation();

  const handleDeleteClick = async () => {
    try {
      await deleteProduct(selectedProduct._id).unwrap();
      notify.success('Product deleted successfully');
    } catch (error) {
      notify.error(error.message || 'Something went wrong');
    } finally {
      handleDelClose();
    }
  };

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
        <Typography variant="h5" fontWeight={600}>Products</Typography>
        <Button onClick={handleClickOpenAdd} variant="contained" color="primary" startIcon={<AddIcon />}>
          Add Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img src={product.image} alt={product.title} width="50" height="50" />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.isFeatured ? 'Yes' : 'No'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(event) => handleMenuClick(event, product)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedProduct?.id === product.id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleClickOpenUpdate()}>Edit</MenuItem>
                    <MenuItem onClick={delPressed}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3, fontWeight: 'bold' }}>
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalProducts}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />

      <AddProductForm open={openAdd} close={handleCloseAdd} />

      <EditProductForm open={openUpdate} close={handleCloseUpdate} product={selectedProduct} />

      <Dialog
        open={openDel}
        onClose={handleDelClose}
      >
        <DialogTitle textAlign={'center'}>
          {"Confirm Deletion !!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign={'center'}>
            Are you sure you want to delete {selectedProduct?.title}? This action cannot be undone.
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

export default AdminProducts;
