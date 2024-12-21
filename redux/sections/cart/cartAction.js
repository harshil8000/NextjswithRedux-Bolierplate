import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCartItems,
  addCartItem,
  removeCartItem,
  updateCartItemQuantity,
  applyCouponCode,
  clearCart
} from '../../api/CartApi/CartApi';

// Thunks to handle async actions

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const data = await fetchCartItems();
  return data;
});

export const addItemToCart = createAsyncThunk('cart/addItem', async (item) => {
  const data = await addCartItem(item);
  return data;
});

export const removeItemFromCart = createAsyncThunk('cart/removeItem', async (itemId) => {
  const data = await removeCartItem(itemId);
  return data;
});

export const updateCartItemQuantity = createAsyncThunk('cart/updateCartItemQuantity', async ({ itemId, quantity }) => {
  const data = await updateCartItemQuantity(itemId, quantity);
  return data;
});

export const applyCoupon = createAsyncThunk('cart/applyCoupon', async (couponCode) => {
  const data = await applyCouponCode(couponCode);
  return data;
});

export const clearCartItems = createAsyncThunk('cart/clearCart', async () => {
  const data = await clearCart();
  return data;
});
