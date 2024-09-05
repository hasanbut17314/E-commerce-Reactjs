import React from 'react';
import { CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import ScrollTop from '../components/ScrollTop';

function Layout() {
  return (
    <>
      <CssBaseline />
      <ScrollTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout