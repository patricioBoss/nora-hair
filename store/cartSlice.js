import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartSlide:false,
  cartItems: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleSlider(state) {
      state.cartSlide= !state.cartSlide
    },
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    updateCart(state, action) {
      state.cartItems = action.payload;
    },
    emptyCart(state, action) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateCart, emptyCart,toggleSlider } = cartSlice.actions;

export default cartSlice.reducer;
