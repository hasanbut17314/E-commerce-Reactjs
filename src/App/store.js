import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { categoryApi } from '../services/categoryApi';
import { productApi } from '../services/productApi';
import { userApi } from '../services/userApi';
import { cartApi } from '../services/cartApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      userApi.middleware,
      cartApi.middleware
    ),
});
