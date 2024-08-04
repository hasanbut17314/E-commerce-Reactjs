import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, FormControl, Select, MenuItem, IconButton, TablePagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const dummyOrders = [
  {
    id: 1,
    user_id: 'User1',
    order_no: 'ORD001',
    status: 'Pending',
    address: '123 Street, City, Country',
    contact_number: '1234567890',
    order_items: [
      { prod_id: 'Prod1', quantity: 2, price: 100 },
      { prod_id: 'Prod2', quantity: 1, price: 200 },
    ],
    total_price: 400,
  },
  {
    id: 2,
    user_id: 'User2',
    order_no: 'ORD002',
    status: 'Shipped',
    address: '456 Avenue, City, Country',
    contact_number: '0987654321',
    order_items: [
      { prod_id: 'Prod3', quantity: 1, price: 300 },
      { prod_id: 'Prod4', quantity: 3, price: 150 },
    ],
    total_price: 750,
  },
  // Add more dummy orders as needed
];

const Orders = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const handleDelete = (id) => {
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>Orders</Typography>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order No</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.order_no}</TableCell>
                <TableCell>{order.user_id}</TableCell>
                <TableCell>{order.contact_number}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>
                  <FormControl variant="outlined" size="small">
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>{order.total_price}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(order.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Orders;
