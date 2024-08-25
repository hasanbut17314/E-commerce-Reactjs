import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../utils/baseURL';

const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token available');

  const response = await fetch(`${baseURL}/users/recreateAccessToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) throw new Error('Unable to refresh token');

  const data = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data.accessToken;
};

const customBaseQuery = fetchBaseQuery({ 
  baseUrl: baseURL,
  prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
      return headers;
  },
  credentials: 'include',
});

const customBaseQueryWithReauth = async (args, api, extraOptions) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    args.headers = {
      ...args.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  let result = await customBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    try {
      const newToken = await refreshAuthToken();
      args.headers.Authorization = `Bearer ${newToken}`;
      result = await customBaseQuery(args, api, extraOptions);
    } catch (refreshError) {
      console.error('Refresh token failed:', refreshError);
      return { error: { status: 401, data: 'Unauthorized' } };
    }
  }

  return result;
};

export default customBaseQueryWithReauth;
