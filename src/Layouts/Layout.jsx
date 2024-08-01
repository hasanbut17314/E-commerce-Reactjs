import React from 'react';
import { CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout