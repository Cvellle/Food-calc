import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {endpoint} from '../../../../config/endpoint';
import type {MealResponse} from '@/lib/nutrition/types';
import {addMeal, removeMeal} from './DailyMealsSlice';

export const dailyMealsApi = createApi({
  reducerPath: 'dailyMealsApi',
  baseQuery: fetchBaseQuery({baseUrl: endpoint}),
  tagTypes: ['DailyMeals'],
  endpoints: (builder) => ({
    allMeals: builder.query<MealResponse[], void>({
      queryFn: (_arg, api) => {
        const state = api.getState() as {dailyMeals: {meals: MealResponse[]}};
        return {data: state.dailyMeals.meals};
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((_, i) => ({type: 'DailyMeals' as const, id: i})),
              {type: 'DailyMeals', id: 'LIST'}
            ]
          : [{type: 'DailyMeals', id: 'LIST'}],
      keepUnusedDataFor: 300
    }),

    addMealToDay: builder.mutation<MealResponse, {mealId: string; date: string}>({
      queryFn: async ({mealId, date}, api) => {
        try {
          const res = await fetch(`${endpoint}/meals/${mealId}`);
          if (!res.ok) throw new Error('Failed to fetch meal');
          const data = (await res.json()) as MealResponse;
          const mealWithDate = {...data, date};
          api.dispatch(addMeal(mealWithDate));
          return {data: mealWithDate};
        } catch {
          return {
            error: {status: 'CUSTOM_ERROR' as const, error: 'Unable to load meal'}
          };
        }
      },
      invalidatesTags: [{type: 'DailyMeals', id: 'LIST'}]
    }),

    removeMealFromDay: builder.mutation<void, number>({
      queryFn: (index, api) => {
        api.dispatch(removeMeal(index));
        return {data: undefined};
      },
      invalidatesTags: [{type: 'DailyMeals', id: 'LIST'}]
    })
  })
});

export const {useAllMealsQuery, useAddMealToDayMutation, useRemoveMealFromDayMutation} =
  dailyMealsApi;
