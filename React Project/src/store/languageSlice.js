import { createSlice } from '@reduxjs/toolkit';
import { setLanguage } from '../services/api';

const initialState = {
  currentLanguage: 'en',
  supportedLanguages: ['en', 'ar', 'fr', 'zh'],
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      setLanguage(action.payload);
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export const selectCurrentLanguage = (state) => state.language.currentLanguage;
export const selectSupportedLanguages = (state) => state.language.supportedLanguages;

export default languageSlice.reducer; 