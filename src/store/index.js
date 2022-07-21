import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialThemeState = { darkMode: false };

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    toggleMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

const store = configureStore({
  reducer: themeSlice.reducer,
});

export const themeActions = themeSlice.actions;

export default store;
