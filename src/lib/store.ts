import {configureStore} from '@reduxjs/toolkit';
import mealsReducer from './features/meals/mealsSlice';
import dailyMealsReducer from './features/meals/DailyMealsSlice';

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    dailyMeals: dailyMealsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
