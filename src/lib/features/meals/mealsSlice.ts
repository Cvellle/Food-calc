import {createSlice} from '@reduxjs/toolkit';
import {fetchMeals, fetchMealById} from './mealsThunks';
import type {MealListItem, MealDetails} from './types';

export interface MealsState {
  list: MealListItem[];
  selectedMeal: MealDetails | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MealsState = {
  list: [],
  selectedMeal: null,
  status: 'idle',
  error: null
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    clearSelectedMeal(state) {
      state.selectedMeal = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔹 fetch meals list
      .addCase(fetchMeals.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error';
      })

      // 🔹 fetch meal by id
      .addCase(fetchMealById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMealById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMeal = action.payload;
      })
      .addCase(fetchMealById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error';
      });
  }
});

export const {clearSelectedMeal} = mealsSlice.actions;
export default mealsSlice.reducer;
