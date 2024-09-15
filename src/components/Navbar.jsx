import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem, Box, InputBase, Modal, Container, Drawer, Divider } from '@mui/material';
import { Search, ShoppingCart, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import logo2 from '../assets/marty_second.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../services/authApi';
import { useGetCartQuery } from '../services/cartApi';
import useAuth from '../hooks/useAuth';
import notify from '../utils/notify';

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
  const [logoutApi, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      notify.success('Logout successful');
      navigate('/login');
    } catch (err) {
      notify.error(err.message || 'Something went wrong');
    }
  };

  const { isAuthenticated } = useAuth();

  const authenticatedMenuItems = [
    <MenuItem key="account">
      <Link>Account</Link>
    </MenuItem>,
    <MenuItem key="track-order">
      <Link>Track Order</Link>
    </MenuItem>,
    <MenuItem key="settings">
      <Link>Settings</Link>
    </MenuItem>,
    <MenuItem key="logout" onClick={handleLogout} disabled={isLoading}>
      <button>Logout</button>
    </MenuItem>,
  ];

  const unauthenticatedMenuItems = [
    <MenuItem key="login">
      <Link to='/login'>Login</Link>
    </MenuItem>,
    <MenuItem key="signup">
      <Link to='/signup'>Sign Up</Link>
    </MenuItem>,
  ];

  const { data: cart } = useGetCartQuery();
  const totalItems = cart?.data?.total || 0;

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
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
            <Link to={isAuthenticated ? '/cart' : '/login'}>
              <IconButton color="inherit">
                <Badge invisible={false} badgeContent={totalItems} color="error">
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
              {isAuthenticated ? authenticatedMenuItems : unauthenticatedMenuItems}
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
          <NavLink to='/'><HomeIcon />Home</NavLink>
          <NavLink to='/about'><InfoIcon />About</NavLink>
          <NavLink to='/products'><InventoryIcon />Products</NavLink>
          <NavLink to='/categories'><CategoryIcon />Categories</NavLink>
          <NavLink to='/contact'><ContactMailIcon />Contact Us</NavLink>
          <Divider />
          {isAuthenticated ? (
            <>
              <NavLink><AccountCircleIcon />Account</NavLink>
              <NavLink><LocalShippingIcon />Track Order</NavLink>
              <NavLink><SettingsIcon />Settings</NavLink>
              <Link onClick={handleLogout} disabled={isLoading}><LogoutIcon />Logout</Link>
            </>
          ) : (
            <>
              <NavLink to='/login'><LoginIcon />Login</NavLink>
              <NavLink to='/signup'><HowToRegIcon />Sign Up</NavLink>
            </>
          )}
        </Box>
      </Drawer>

      <SearchModal open={searchOpen} handleClose={handleSearchClose} />
    </AppBar>
  );
};

export default Navbar;
