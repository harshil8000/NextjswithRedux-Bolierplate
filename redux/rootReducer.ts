import AllplansSlice from './sections/allplans/AllpansSlice';
import AuthSlice from './sections/auth/AuthSlice';
import CartSlice from "./sections/cart/cartSlice";
import productSlice from "./sections/product/productSlice";


export const reducer = {
  Allplans:AllplansSlice,
  Auth : AuthSlice,
  cart: CartSlice,
  products: productSlice,

};
