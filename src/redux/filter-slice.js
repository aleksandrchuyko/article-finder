import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
  keywords: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setKeywords: (state, action) => {
      state.keywords = action.payload;
    },
  },
});

export const { setFilter, setKeywords } = filterSlice.actions;

export const getFilter = (state) => state.filter.filter;
export const getKeywords = (state) => state.filter.keywords;
