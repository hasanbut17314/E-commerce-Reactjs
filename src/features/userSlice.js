import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../services/userApi';

const initialState = {
  users: [],
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.fetchUsers.matchFulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addMatcher(userApi.endpoints.fetchUserById.matchFulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
