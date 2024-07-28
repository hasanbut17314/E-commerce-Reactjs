import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem, Box, InputBase, Modal, Container, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Search, ShoppingCart, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import logo2 from '../assets/marty_second.png'
import { NavLink } from 'react-router-dom';

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
        width: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
        display: 'flex',
        alignItems: 'center',
      }}
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

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Container>
        <Toolbar>
          {/* Left Side: Logo */}
          <Typography sx={{ flexGrow: 1 }}>
            <img src={logo2} className='w-32' alt="" />
          </Typography>

          {/* Center: Nav Items - Hidden on Small Screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly', mr: 6 }}>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/products'>Products</NavLink>
            <NavLink to='/category'>Categories</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
          </Box>

          {/* Right Side: Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={handleSearchOpen}>
              <Search />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {['Account', 'Track Order', 'Settings'].map((item) => (
                <MenuItem key={item} onClick={handleMenuClose}>
                  {item}
                </MenuItem>
              ))}
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
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {['Home', 'About', 'Categories', 'Products', 'Contact Us'].map((item) => (
              <ListItem button key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Account', 'Track Order', 'Settings'].map((item) => (
              <ListItem button key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <SearchModal open={searchOpen} handleClose={handleSearchClose} />
    </AppBar>
  );
};

export default Navbar;
