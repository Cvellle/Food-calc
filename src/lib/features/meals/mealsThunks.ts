import {createAsyncThunk} from '@reduxjs/toolkit';
import type {MealListItem, MealDetails} from './types';
import {endpoint} from '../../../../config/endpoint';

export const fetchMeals = createAsyncThunk<
  MealListItem[],
  void,
  {rejectValue: string}
>('meals/fetchMeals', async (_, {rejectWithValue}) => {
  try {
    const res = await fetch(`${endpoint}/meals`);

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
    const res = await fetch(`${endpoint}/meals/${mealId}`);

    if (!res.ok) throw new Error('Failed');

    return (await res.json()) as MealDetails;
  } catch {
    return rejectWithValue('Error fetching meal');
  }
});
