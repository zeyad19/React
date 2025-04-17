import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLanguage: 'en',
  isRTL: false,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      const language = action.payload;
      state.currentLanguage = language;
      state.isRTL = language === 'ar';
      document.documentElement.dir = state.isRTL ? 'rtl' : 'ltr';
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer; 