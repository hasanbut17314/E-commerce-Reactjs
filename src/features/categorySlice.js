import { createSlice } from '@reduxjs/toolkit';
import { categoryApi } from '../services/categoryApi';

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      categoryApi.endpoints.fetchCategories.matchFulfilled,
      (state, { payload }) => {
        state.categories = payload;
      }
    );
  },
});

export default categorySlice.reducer;
