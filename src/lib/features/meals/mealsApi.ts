import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {endpoint} from '../../../../config/endpoint';
import type {MealListItem, MealDetails} from './types';

export const mealsApi = createApi({
  reducerPath: 'mealsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: endpoint,
    credentials: 'include'
  }),
  tagTypes: ['Meals'],
  endpoints: (builder) => ({
    allMeals: builder.query<MealListItem[], void>({
      query: () => '/meals',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({id}) => ({type: 'Meals' as const, id})),
              {type: 'Meals', id: 'LIST'}
            ]
          : [{type: 'Meals', id: 'LIST'}],
      keepUnusedDataFor: 300
    }),
    mealById: builder.query<MealDetails, number | string>({
      query: (id) => `/meals/${id}`,
      providesTags: (_result, _error, id) => [{type: 'Meals', id}]
    })
  })
});

export const {useAllMealsQuery, useMealByIdQuery} = mealsApi;
