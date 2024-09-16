import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './App/store';
import { Provider } from 'react-redux';
import NotificationProvider from './components/NotificationProvider';
import ProtectedRoute from './Layouts/ProtectedRoute';
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
import AdminProducts from './pages/dashboard/DashboardProducts';
import Orders from './pages/dashboard/Orders';
import Users from './pages/dashboard/Users';
import Settings from './pages/dashboard/Settings';
import ViewProduct from './pages/ViewProduct';
import ViewCategory from './pages/ViewCategory';
import VerifyEmail from './pages/VerifyEmail';

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
          path: '/product/:id',
          element: <ViewProduct />
        },
        {
          path: '/categories',
          element: <Category />
        },
        {
          path: '/category/:id',
          element: <ViewCategory />
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
      path: '/verify-email/:token',
      element: <VerifyEmail />
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          element: <DashboardHome />
        },
        {
          path: '/dashboard/categories',
          element: <Categories />
        },
        {
          path: '/dashboard/products',
          element: <AdminProducts />
        },
        {
          path: '/dashboard/orders',
          element: <Orders />
        },
        {
          path: '/dashboard/users',
          element: <Users />
        },
        {
          path: '/dashboard/settings',
          element: <Settings />
        }
      ]
    }
  ])

  return (
    <Provider store={store}>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </Provider>
  )
}

export default App
