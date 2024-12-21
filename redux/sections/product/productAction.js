import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductApi from "../../api/ProductApi/ProductApi"; // Adjust the path as needed

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, category, categorys, limit, search, inStock, tags }, thunkAPI) => {
    try {
      const response = await ProductApi.getProductApi(page, category, categorys, limit, search, inStock, tags);
      return response; // This will be the payload returned to the fulfilled case in the slice
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // This will be the payload returned to the rejected case in the slice
    }
  }
);
