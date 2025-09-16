import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import ScrollTop from '../components/ScrollTop';

function Layout() {

  useEffect(() => {
    const insertLog = async () => {
      try {
        const response = await fetch('https://martyz-backend.vercel.app/track')
        console.log('Log inserted:', response.status);
      } catch (error) {
        console.error('Error inserting log:', error);
      }
    }

    insertLog();
  }, []);
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