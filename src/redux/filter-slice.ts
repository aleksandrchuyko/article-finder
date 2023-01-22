import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  filter: '',
  keywords: [''],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setKeywords: (state, action: PayloadAction<string[]>) => {
      state.keywords = action.payload;
    },
  },
});

export const { setFilter, setKeywords } = filterSlice.actions;

export const getFilter = (state: RootState) => state.filter.filter;
export const getKeywords = (state: RootState) => state.filter.keywords;
