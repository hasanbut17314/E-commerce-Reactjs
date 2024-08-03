import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Register';
import Layout from './Layouts/Layout';
import DashboardLayout from './Layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Categories from './pages/dashboard/DashboardCategory';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/products',
          element: <Products />
        },
        {
          path: '/categories',
          element: <Category />
        },
        {
          path: '/cart',
          element: <Cart />
        },
        {
          path: '/checkout',
          element: <Checkout />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: '',
          element: <DashboardHome />
        },
        {
          path: '/dashboard/categories',
          element: <Categories />
        },
      ]
    }
  ])

  return (

    <RouterProvider router={router} />

  )
}

export default App
