import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    loading: true,
    error: null, // Add an error state
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      // Clear token from local storage if it was stored
      localStorage.removeItem('authToken');
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post('https://devi-backend.onrender.com/api/auth/login', credentials);
    // Store token in local storage
    localStorage.setItem('authToken', res.data.token);
    dispatch(loginSuccess(res.data.token));
  } catch (err) {
    // Dispatch login failure action with error message
    dispatch(loginFailure(err.response?.data?.message || 'An error occurred'));
  }
};

export default authSlice.reducer;
