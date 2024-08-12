import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import authReducer from '../features/authSlice';
import { categoryApi } from '../services/categoryApi';
import categoryReducer from '../features/categorySlice';
import { productApi } from '../services/productApi';
import productReducer from '../features/productSlice';
import { userApi } from '../services/userApi';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      userApi.middleware
    ),
});
