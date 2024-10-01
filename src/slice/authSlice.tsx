import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface Credentials {
  username: string;
  password: string;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('authToken');
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (credentials: Credentials) => async (dispatch: any) => {
  try {
    // const res = await axios.post('https://devi-backend.onrender.com/api/auth/login', credentials);
    const res = await axios.post('http://localhost:8080/api/admin/login', credentials);
    localStorage.setItem('authToken', res.data.token);
    dispatch(loginSuccess(res.data.token));
  } catch (err: any) {
    dispatch(loginFailure(err.response?.data?.message || 'An error occurred'));
  }
};

export default authSlice.reducer;
