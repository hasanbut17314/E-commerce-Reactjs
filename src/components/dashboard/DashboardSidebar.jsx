import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import OrderIcon from '@mui/icons-material/Assignment';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
  { text: 'Categories', icon: <CategoryIcon />, link: '/dashboard/categories' },
  { text: 'Products', icon: <ShoppingCartIcon />, link: '/dashboard/products' },
  { text: 'Orders', icon: <OrderIcon />, link: '/dashboard/orders' },
  { text: 'Users', icon: <PeopleIcon />, link: '/dashboard/users' },
  { text: 'Settings', icon: <SettingsIcon />, link: '/dashboard/settings' },
];

const drawerWidth = 240;

const DashboardSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="h-full">
      <div className="p-4 text-center">
        <Typography variant="h5" className="font-bold">Admin Panel</Typography>
      </div>
      <List>
        {menuItems.map((item, index) => (
          <Link to={item.link} key={index} className="no-underline text-gray-700">
            <ListItem button className="py-2 px-3">
              <ListItemIcon className="text-gray-700">{item.icon}</ListItemIcon>
              <ListItemText primary={<Typography variant="body1" className="font-medium">{item.text}</Typography>} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { md: 'none' }, margin: 1 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default DashboardSidebar;
