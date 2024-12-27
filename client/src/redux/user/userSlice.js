import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CurrentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true; // Correct direct mutation
      state.error = null; // Clear any existing errors
    },
    signInSuccess: (state, action) => {
      state.loading = false; // Stop loading
      state.CurrentUser = action.payload; // Save the user data
      state.error = null; // Clear any errors
    },
    signInFailure: (state, action) => {
      state.loading = false; // Stop loading
      state.error = action.payload; // Save the error message
      state.CurrentUser = null; // Clear user data
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
