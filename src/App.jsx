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
import DashboardHome from './pages/dashboard/DashboardHome';

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
      element: <DashboardHome />
    }
  ])

  return (

    <RouterProvider router={router} />

  )
}

export default App
