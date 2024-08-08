import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from './customBaseQuery';

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (formData) => ({
                url: "/products/addProduct",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Products"],
        }),
        fetchProducts: builder.query({
            query: ({page=1, limit=10} = {}) => ({
                url: `/products/getAllProducts?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Products"],
        }),
    }),
})

export const { 
    useCreateProductMutation,
    useFetchProductsQuery
} = productApi