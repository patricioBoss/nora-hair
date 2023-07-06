import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartSlide: false,
  cartItems: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleSlider(state) {
      console.log("toggleSlider is toggled");
      state.cartSlide = !state.cartSlide;
    },
    closeSlider(state) {
      console.log("closeSlider is clicked");
      state.cartSlide = false;
    },
    addToCart(state, action) {
      console.log("addToCart is clicked");
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

export const { addToCart, updateCart, emptyCart, toggleSlider, closeSlider } =
  cartSlice.actions;

export default cartSlice.reducer;
