// src/lib/features/meals/mealsThunks.ts

import {createAsyncThunk} from '@reduxjs/toolkit';
import type {MealsResponse} from './types';

export const fetchMeals = createAsyncThunk<
  MealsResponse,
  void,
  {rejectValue: string}
>('meals/fetchMeals', async (_, {rejectWithValue}) => {
  try {
    const res = await fetch('/api/meals');

    if (!res.ok) {
      throw new Error('Failed to fetch meals');
    }

    return (await res.json()) as MealsResponse;
  } catch (err) {
    return rejectWithValue('Error fetching meals');
  }
});
