import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem, Box, InputBase, Modal, Container, Drawer, Divider } from '@mui/material';
import { Search, ShoppingCart, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import logo2 from '../assets/marty_second.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { useLogoutMutation } from '../services/authApi';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SearchModal = ({ open, handleClose }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="search-modal"
    aria-describedby="search-for-products"
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginTop: 2,
    }}
  >
    <Box
      sx={{
        width: { xs: '90%', sm: '80%', md: '70%', lg: '50%' },
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        display: 'flex',
        alignItems: 'center',
      }}
      className="lg:p-4 md:p-3 p-2"
    >
      <InputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        sx={(theme) => ({
          color: 'inherit',
          flex: 1,
          '& .MuiInputBase-input': {
            padding: theme.spacing(1),
          },
        })}
      />
      <IconButton color="inherit">
        <Search />
      </IconButton>
    </Box>
  </Modal>
);

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearchOpen = () => setSearchOpen(true);
  const handleSearchClose = () => setSearchOpen(false);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApi, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      toast.success('Logout successful');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <ToastContainer
        autoClose={3000}
        position="bottom-center"
        hideProgressBar={true}
      />
      <Container maxWidth="xl" sx={{ paddingX: { xs: 0, md: 2 } }}>
        <Toolbar>
          {/* Left Side: Logo */}
          <Typography sx={{ flexGrow: 1 }}>
            <img src={logo2} className='md:w-32 w-28' alt="" />
          </Typography>

          {/* Center: Nav Items - Hidden on Small Screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly', mr: 10, fontSize: 18 }}>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/products'>Products</NavLink>
            <NavLink to='/categories'>Categories</NavLink>
            <NavLink to='/contact'>Contact Us</NavLink>
          </Box>

          {/* Right Side: Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={handleSearchOpen}>
              <Search />
            </IconButton>
            <Link to='/cart'>
              <IconButton color="inherit">
                <Badge invisible={false} badgeContent={4} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
            <IconButton color="inherit" onClick={handleMenuOpen}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem>
                <NavLink>Account</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink>Track Order</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink>Settings</NavLink>
              </MenuItem>
              <MenuItem onClick={handleLogout} disabled={isLoading}>
                <button>Logout</button>
              </MenuItem>
            </Menu>
          </Box>

          {/* Hamburger Icon for Small Screens */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 'auto' }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Drawer for Small Screens */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, display: 'flex', flexDirection: 'column' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          className="sm-navbar"
        >
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/products'>Products</NavLink>
          <NavLink to='/categories'>Categories</NavLink>
          <NavLink to='/contact'>Contact Us</NavLink>
          <Divider />
          <NavLink>Account</NavLink>
          <NavLink>Track Order</NavLink>
          <NavLink>Settings</NavLink>
        </Box>
      </Drawer>

      <SearchModal open={searchOpen} handleClose={handleSearchClose} />
    </AppBar>
  );
};

export default Navbar;
