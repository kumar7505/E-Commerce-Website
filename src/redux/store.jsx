import { configureStore } from '@reduxjs/toolkit' 
import cartSlice from "./cartSlice"

export const store = configureStore({
  reducer: {
    cart: cartSlice
  },
  devTools:true
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
});

export default store;
