import {configureStore} from '@reduxjs/toolkit';
import mealsReducer from './features/meals/mealsSlice';
import dailyMealsReducer from './features/meals/DailyMealsSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    dailyMeals: dailyMealsReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
