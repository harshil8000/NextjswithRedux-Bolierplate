import { createSlice } from '@reduxjs/toolkit';
import {getAllplans } from './AllplansAction';

export type AllplansState = {
  loading: boolean;
  error: any;
  success: boolean;
  Allplans: any[];
};

const initialState: AllplansState = {
  loading: false,
  error: null,
  success: false,
  Allplans: [],
};

const AllplansSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllplans.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(getAllplans.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.Allplans = payload.data;
      state.success = true;
    });

    builder.addCase(getAllplans.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default AllplansSlice.reducer;
