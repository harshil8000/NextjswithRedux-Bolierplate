import authApi from '../../api/authApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const SignupApi = createAsyncThunk(
    'AuthApi/SignupApi',
    async (data, { rejectWithValue }) => {
      try {
        const response = await authApi.Signupapi(data);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export const LoginApi = createAsyncThunk(
    'AuthApi/LoginApi',
    async (data, { rejectWithValue }) => {
      try {
        const response = await authApi.LoginApi(data);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );