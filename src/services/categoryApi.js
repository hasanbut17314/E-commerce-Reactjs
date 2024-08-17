import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './customBaseQuery';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: customBaseQuery,
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (formData) => ({
                url: '/category/addCategory',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Category'],
        }),
        updateCategory: builder.mutation({
            query: ({id, formData}) => ({
                url: `/category/updateCategory/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Category'],
        }),
        fetchCategories: builder.query({
            query: ({page=1, limit=10, status} = {}) => ({
                url: `/category/getAllCategories?page=${page}&limit=${limit}&status=${status || ''}`,
                method: 'GET',
            }),
            providesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/deleteCategory/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useFetchCategoriesQuery,
    useDeleteCategoryMutation
} = categoryApi;
