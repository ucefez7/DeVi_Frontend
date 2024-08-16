import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the state interface
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Define the initial state using the AuthState interface
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
      // Clear token from local storage if it was stored
      localStorage.removeItem('authToken');
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

// Define the login function with appropriate types
export const login = (credentials: { username: string; password: string }) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post('https://devi-backend.onrender.com/api/auth/login', credentials);
    // Store token in local storage
    localStorage.setItem('authToken', res.data.token);
    dispatch(loginSuccess(res.data.token));
  } catch (err: any) {
    // Dispatch login failure action with error message
    dispatch(loginFailure(err.response?.data?.message || 'An error occurred'));
  }
};

export default authSlice.reducer;
