// src/lib/features/meals/mealsSlice.ts

import {createSlice} from '@reduxjs/toolkit';
import {fetchMeals} from './mealsThunks';
import type {MealsResponse} from './types';

export interface MealsState {
  nutrients: MealsResponse['nutrients'];
  items: MealsResponse['items'];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MealsState = {
  nutrients: [],
  items: [],
  status: 'idle',
  error: null
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    clearMeals: (state) => {
      state.nutrients = [];
      state.items = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.nutrients = action.payload.nutrients;
        state.items = action.payload.items;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error';
      });
  }
});

export const {clearMeals} = mealsSlice.actions;
export default mealsSlice.reducer;
