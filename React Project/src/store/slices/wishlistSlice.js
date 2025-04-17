import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  count: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { id, type, title, poster_path } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (!existingItem) {
        state.items.push({ id, type, title, poster_path });
        state.count += 1;
      }
    },
    removeFromWishlist: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.count -= 1;
    },
    clearWishlist: (state) => {
      state.items = [];
      state.count = 0;
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; 