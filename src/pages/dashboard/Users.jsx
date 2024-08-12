import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, FormControl, Select, MenuItem, IconButton, TablePagination, Button,
  Dialog, DialogTitle, DialogContent, TextField,
  InputLabel, CircularProgress, DialogActions, DialogContentText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFetchUsersQuery } from '../../services/userApi';
import { useCreateUserMutation } from '../../services/userApi';
import { useChangeUserRoleMutation } from '../../services/userApi';
import { useDeleteUserMutation } from '../../services/userApi';
import notify from '../../utils/notify';

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDel, setOpenDel] = useState(false);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const { data: usersData, isLoading: isFetching, error } = useFetchUsersQuery({
    page: page + 1,
    limit: rowsPerPage
  });
  const users = usersData?.data?.users || [];
  const totalUsers = usersData?.data?.pagination.total || 0;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason === 'backdropClick') return;
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUser).unwrap();
      notify.success('User created successfully');
      handleClose();
      setNewUser({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
      })
    } catch (error) {
      notify.error(error.message || 'Something went wrong');
    }
  };

  const [changeUserRole] = useChangeUserRoleMutation();

  const updateRole = async (role, userId) => {
    try {
      await changeUserRole({ id: userId, role }).unwrap();
      notify.success('User role updated successfully');
    } catch (error) {
      notify.error(error.message || 'Something went wrong');
    }
  }

  const handleDelClose = (_, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    setOpenDel(false);
    setSelectedUser(null);
  };

  const delPressed = (Crntuser) => {
    setOpenDel(true);
    setSelectedUser(Crntuser);
  };

  const [deleteUser, { isLoading: delLoading }] = useDeleteUserMutation();

  const handleDeleteClick = async () => {
    try {
      await deleteUser(selectedUser._id).unwrap();
      notify.success('User deleted successfully');
      handleDelClose();
    } catch (error) {
      notify.error(error.message || 'Something went wrong');
    }
  }

  if (isFetching) {
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
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">Users</Typography>
        <Button onClick={handleClickOpen} variant="contained" color="primary" startIcon={<AddIcon />}>
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <FormControl variant="outlined" size="small">
                    <Select
                      value={user.role}
                      onChange={(e) => updateRole(e.target.value, user._id)}
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => delPressed(user)}>
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
        count={totalUsers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate onSubmit={handleAddUser}>
            <TextField
              required
              fullWidth
              label="Username"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={newUser.confirmPassword}
              onChange={handleInputChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              {!isCreating && <Button onClick={handleClose} variant="outlined">Cancel</Button>}
              <Button type='submit' variant="contained" color="primary" disabled={isCreating}>
                {isCreating ? <CircularProgress size={24} /> : 'Add User'}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDel}
        onClose={handleDelClose}
      >
        <DialogTitle textAlign={'center'}>
          {"Confirm Deletion !!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign={'center'}>
            Are you sure you want to delete {selectedUser?.username}? This action cannot be undone.
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

export default Users;
