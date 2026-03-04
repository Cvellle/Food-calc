import {configureStore} from '@reduxjs/toolkit';
import mealsReducer from './features/meals/mealsSlice';
import dailyMealsReducer from './features/meals/DailyMealsSlice';
import authReducer from './features/auth/authSlice';
import {dailyMealsApi} from './features/meals/dailyMealsApi';

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    dailyMeals: dailyMealsReducer,
    auth: authReducer,
    [dailyMealsApi.reducerPath]: dailyMealsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dailyMealsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
