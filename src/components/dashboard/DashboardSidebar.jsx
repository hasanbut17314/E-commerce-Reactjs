import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import OrderIcon from '@mui/icons-material/Assignment';
import logo from '../../assets/martyz_logo.png';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
  { text: 'Categories', icon: <CategoryIcon />, link: '/dashboard/categories' },
  { text: 'Products', icon: <ShoppingCartIcon />, link: '/dashboard/products' },
  { text: 'Orders', icon: <OrderIcon />, link: '/dashboard/orders' },
  { text: 'Users', icon: <PeopleIcon />, link: '/dashboard/users' },
  { text: 'Settings', icon: <SettingsIcon />, link: '/dashboard/settings' },
];

const drawerWidth = 200;

const DashboardSidebar = ({mobileOpen, handleDrawerToggle}) => {

  const drawer = (
    <div className="h-full">
      <div className="p-3 text-center">
        <img src={logo} alt="Martyz" className='h-14 w-40 mx-auto' />
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
      <Drawer
        className='md:block hidden'
        variant="permanent"
        sx={{
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default DashboardSidebar;
