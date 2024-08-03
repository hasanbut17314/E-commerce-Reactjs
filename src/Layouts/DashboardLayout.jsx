import React, { useState } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  return (
    <div className="flex">
      <DashboardSidebar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
      <div className="flex-grow md:ml-[200px]">
        <DashboardHeader handleDrawerToggle={handleDrawerToggle} />
        <div className="p-3 mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
