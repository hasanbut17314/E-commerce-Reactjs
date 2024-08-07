import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './customBaseQuery';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (formData) => ({
                url: '/category/addCategory',
                method: 'POST',
                body: formData,
            }),
        }),
        fetchCategories: builder.query({
            query: () => ({
                url: '/category/getAllCategories',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useFetchCategoriesQuery
} = categoryApi;
