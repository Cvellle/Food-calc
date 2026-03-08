import {createAsyncThunk} from '@reduxjs/toolkit';
import type {MealListItem, MealDetails} from './types';

export const fetchMeals = createAsyncThunk<
  MealListItem[],
  void,
  {rejectValue: string}
>('meals/fetchMeals', async (_, {rejectWithValue}) => {
  try {
    const res = await fetch('/api/meals', {
      method: 'GET',
      credentials: 'include'
    });

    if (!res.ok) throw new Error('Failed');

    return (await res.json()) as MealListItem[];
  } catch {
    return rejectWithValue('Error fetching meals');
  }
});

export const fetchMealById = createAsyncThunk<
  MealDetails,
  number | string,
  {rejectValue: string}
>('meals/fetchMealById', async (mealId, {rejectWithValue}) => {
  try {
    const res = await fetch(`/api/meals/${mealId}`, {credentials: 'include'});

    if (!res.ok) throw new Error('Failed');

    return (await res.json()) as MealDetails;
  } catch {
    return rejectWithValue('Error fetching meal');
  }
});
