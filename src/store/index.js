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

const initialDataState = {
  searchData: [],
  noResults: false,
  favorites: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialDataState,
  reducers: {
    setSearchData(state, action) {
      state.searchData = action.payload;
    },
    setNoResults(state, action) {
      state.noResults = action.payload;
    },
    setFavIconPressed(state, action) {
      state.searchData = state.searchData.map(item => {
        if (item.word === action.payload)
          return {
            favIconPressed: !item.favIconPressed,
            word: item.word,
          };
        else return item;
      });
    },
    setFavorites(state, action) {
      const sameItem = state.favorites.some(item => item.word === action.payload.word);

      if (!sameItem) state.favorites.push({ word: action.payload.word, favIconPressed: true });
      else state.favorites = state.favorites.filter(item => item.word !== action.payload.word);
    },
    setDatabaseFavorites(state, action) {
      state.favorites = action.payload;
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
