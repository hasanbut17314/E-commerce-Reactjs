import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './customBaseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/users/register',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    refreshAccessToken: builder.mutation({
      query: (refreshToken) => ({
        url: '/users/recreateAccessToken',
        method: 'POST',
        body: { refreshToken },
        credentials: 'include',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useRefreshAccessTokenMutation,
  useLogoutMutation
} = authApi;
