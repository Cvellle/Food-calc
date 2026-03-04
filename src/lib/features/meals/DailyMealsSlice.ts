import type {MealResponse, Suggestion} from '@/lib/nutrition/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '@/lib/store';

type DailyMealsState = {
  meals: MealResponse[];
  suggestions: Suggestion[];
  selectedDate: string;
};

const initialState: DailyMealsState = {
  meals: [],
  suggestions: [],
  selectedDate: new Date().toISOString()
};

const dailyMealsSlice = createSlice({
  name: 'dailyMeals',
  initialState,
  reducers: {
    addMeal(state, action: PayloadAction<MealResponse>) {
      state.meals.push(action.payload);
    },
    removeMeal(state, action: PayloadAction<number>) {
      state.meals.splice(action.payload, 1);
    },
    clearDay(state) {
      state.meals = [];
    },
    setSuggestions(state, action: PayloadAction<Suggestion[]>) {
      state.suggestions = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    }
  }
});

export const selectSelectedDate = (state: RootState): string =>
  state.dailyMeals.selectedDate;

export const {addMeal, removeMeal, clearDay, setSuggestions, setSelectedDate} =
  dailyMealsSlice.actions;

export default dailyMealsSlice.reducer;
