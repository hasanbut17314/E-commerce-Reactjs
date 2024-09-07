import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './customBaseQuery';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: customBaseQuery,
    tagTypes: ['Cart'],

    endpoints: (build) => ({
        getCart: build.query({
            query: () => ({
                url: '/cart/getCart',
                method: 'GET',
            }),
            providesTags: ['Cart'],
        }),
        addToCart: build.mutation({
            query: (product) => ({
                url: '/cart/addToCart',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Cart'],
        }),
        updateItemQuantity: build.mutation({
            query: (product) => ({
                url: '/cart/updateItemQuantity',
                method: 'PUT',
                body: product,
            }),
            invalidatesTags: ['Cart'],
        }),
        deleteItemFromCart: build.mutation({
            query: (id) => ({
                url: '/cart/deleteItemFromCart',
                method: 'DELETE',
                body: id,
            }),
            invalidatesTags: ['Cart'],
        }),
        emptyCart: build.mutation({
            query: () => ({
                url: '/cart/emptyCart',
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
    })
});

export const {
    usegetCartQuery,
    useAddToCartMutation,
    useUpdateItemQuantityMutation,
    useDeleteItemFromCartMutation,
    useEmptyCartMutation
} = cartApi