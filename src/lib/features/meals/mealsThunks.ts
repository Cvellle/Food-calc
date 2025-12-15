import {createAsyncThunk} from '@reduxjs/toolkit';
import type {MealsResponse} from './types';

export const fetchMeals = createAsyncThunk<
  MealsResponse,
  void,
  {rejectValue: string}
>('meals/fetchMeals', async (_, {rejectWithValue}) => {
  try {
    const res = await fetch('http://postgre-sql-1.vercel.app/meals/1');

    if (!res.ok) throw new Error('Failed');

    return (await res.json()) as MealsResponse;
  } catch {
    return rejectWithValue('Error fetching meals');
  }
});
