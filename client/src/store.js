// client/src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add cart slice to the store
  },
});

export default store;
