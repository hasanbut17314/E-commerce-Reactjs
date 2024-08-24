import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: customBaseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (credentials) => ({
                url: "/users/register",
                method: "POST",
                body: credentials,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
        fetchUsers: builder.query({
            query: ({ page = 1, limit = 10 } = {}) => ({
                url: `/users/getAllUsers?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: (credentials) => ({
                url: "/users/changeUserDetails",
                method: "PUT",
                body: credentials,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/deleteUser/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
        changeUserRole: builder.mutation({
            query: ({ id, role }) => ({
                url: `/users/changeUserRole/${id}`,
                method: "PUT",
                body: { role }
            }),
            invalidatesTags: ["User"],
        }),
        fetchUserById: builder.query({
            query: () => ({
                url: "/users/getUserDetails",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
    })
})

export const { useCreateUserMutation, useFetchUsersQuery, useUpdateUserMutation, useDeleteUserMutation, useChangeUserRoleMutation, useFetchUserByIdQuery } = userApi