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
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddProductForm from '../../components/dashboard/AddProductForm';
import EditProductForm from '../../components/dashboard/EditProductForm';

const dummyProducts = [
  { id: 1, title: 'Product 1', status: 'Active', image: 'https://via.placeholder.com/120', isFeatured: true },
  { id: 2, title: 'Product 2', status: 'Hidden', image: 'https://via.placeholder.com/120', isFeatured: false },
  // Add more dummy products as needed
];

const AdminProducts = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleClickOpenUpdate = (product) => {
    setSelectedProduct(product);
    setOpenUpdate(true);
    setAnchorEl(null);
  };

  const handleCloseUpdate = () => {
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

  const paginatedProducts = dummyProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
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
                    <MenuItem onClick={() => handleClickOpenUpdate(product)}>Edit</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={dummyProducts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openAdd} onClose={handleCloseAdd} fullWidth maxWidth="sm">
        <DialogContent>
          <AddProductForm />
        </DialogContent>
      </Dialog>
      <Dialog open={openUpdate} onClose={handleCloseUpdate} fullWidth maxWidth="sm">
        <DialogContent>
          <EditProductForm product={selectedProduct} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminProducts;
