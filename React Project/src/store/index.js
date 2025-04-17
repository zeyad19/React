import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './wishlistSlice';
import languageReducer from './languageSlice';

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    language: languageReducer,
  },
});

export default store; 