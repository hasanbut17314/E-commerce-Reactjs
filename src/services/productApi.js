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
            query: ({page=1, limit=10, status, isFeatured} = {}) => {
                let url = `/products/getAllProducts?page=${page}&limit=${limit}`;
                if (status) url += `&status=${status}`;
                if (isFeatured !== undefined) url += `&isFeatured=${isFeatured}`;
                return {
                    url: url,
                    method: "GET",
                    credentials: "include",
                }
            },
            providesTags: ["Products"],
        }),
        fetchProductById: builder.query({
           query: (id) => ({
               url: `/products/productById/${id}`,
               method: "GET",
           }),
           providesTags: ["Products"], 
        }),
        updateProduct: builder.mutation({
            query: ({id, formData}) => ({
                url: `/products/updateProduct/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/deleteProduct/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
    }),
})

export const { 
    useCreateProductMutation,
    useFetchProductsQuery,
    useFetchProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApi