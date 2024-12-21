import Allplansapi from '../../api/Allplansapi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllplans = createAsyncThunk(
    'Allplans/getAllplans',
    async (data:any, { rejectWithValue }) => {
      try {
        const response = await Allplansapi.getAllplansapi(data);
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );