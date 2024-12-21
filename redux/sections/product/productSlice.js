import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productAction";

const initialState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  success: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Define any synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.products = []
    });

    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.products = payload.data;
      state.success = true;
      state.totalPages = payload.totalPages
    });

    builder.addCase(fetchProducts.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.products = []

    });


  },
});

// Export the actions if you defined any in `reducers`
export const { } = productsSlice.actions;

export default productsSlice.reducer;
