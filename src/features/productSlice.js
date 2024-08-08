import { createSlice } from "@reduxjs/toolkit";
import { productApi } from "../services/productApi";

const initialState = {
    products: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(productApi.endpoints.fetchProducts.matchFulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export default productSlice.reducer;