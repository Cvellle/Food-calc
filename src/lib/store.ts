import {configureStore} from '@reduxjs/toolkit';
import mealsReducer from './features/meals/mealsSlice';

export const store = configureStore({
  reducer: {
    meals: mealsReducer
  }
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
