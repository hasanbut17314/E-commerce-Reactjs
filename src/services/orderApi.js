import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Order"],

    endpoints: (build) => ({
        getOrder: build.query({
            query: () => ({
                url: '/order/getOrder',
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),
        createOrder: build.mutation({
            query: (order) => ({
                url: '/order/createOrder',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Order'],
        }),
        getAllOrders: build.query({
            query: ({limit = 12, page = 1} = {}) => ({
                url: '/order/getAllOrders',
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),
        deleteOrder: build.mutation({
            query: (id) => ({
                url: `/order/deleteOrder/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order'],
        }),
        updateOrderStatus: build.mutation({
            query: ({id, status}) => ({
                url: `/order/updateOrderStatus/${id}`,
                method: 'PUT',
                body: {status}
            }),
            invalidatesTags: ['Order'],
        })
    })
})

export const {
    useGetOrderQuery,
    useCreateOrderMutation,
    useDeleteOrderMutation,
    useGetAllOrdersQuery,
    useUpdateOrderStatusMutation
} = orderApi