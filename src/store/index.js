import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialThemeState = { darkMode: false };

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    setAsyncStorageThemeState(state, action) {
      state.darkMode = action.payload;
    },

    toggleMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

const initialDataState = {
  searchedData: [],
  noResults: false,
  favorites: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialDataState,
  reducers: {
    setDatabaseFavorites(state, action) {
      state.favorites = action.payload;
    },

    setSearchedData(state, action) {
      state.searchedData = action.payload;
    },

    setNoResults(state, action) {
      state.noResults = action.payload;
    },

    updateSearchedData(state, action) {
      state.searchedData = state.searchedData.map(item => {
        return item.word === action.payload
          ? { word: item.word, favIconPressed: !item.favIconPressed }
          : item;
      });
    },

    setFavorites(state, action) {
      const sameItem = state.favorites.some(item => item.word === action.payload.word);

      if (!sameItem) state.favorites.push({ word: action.payload.word, favIconPressed: true });
      else state.favorites = state.favorites.filter(item => item.word !== action.payload.word);
    },
  },
});

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    data: dataSlice.reducer,
  },
});

export const themeActions = themeSlice.actions;
export const dataActions = dataSlice.actions;

export default store;
