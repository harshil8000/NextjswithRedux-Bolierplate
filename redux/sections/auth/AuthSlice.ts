import { createSlice } from '@reduxjs/toolkit';
import { SignupApi, LoginApi } from './AuthAction';

export type AuthState = {
  loading: boolean;
  error: any;
  success: boolean;
  AuthSignup: any[];
  token: string | null;
};

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  AuthSignup: [],
  token: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SignupApi.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(SignupApi.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.AuthSignup = payload.data;
      state.success = true;
    });

    builder.addCase(SignupApi.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(LoginApi.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(LoginApi.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.AuthSignup = payload.data;
      state.token = payload.token; // Store token
      localStorage.setItem('token', payload.token); // Save token to local storage
      state.success = true;
    });

    builder.addCase(LoginApi.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default AuthSlice.reducer;
