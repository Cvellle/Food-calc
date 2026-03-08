'use client';

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {dailyMealsKeys} from './daily-meals-keys';
import {getMealById} from '@/lib/features/meals/meals-actions';
import type {MealResponse} from '@/lib/nutrition/types';

export function useDailyMeals() {
  return useQuery<MealResponse[]>({
    queryKey: dailyMealsKeys.list(),
    queryFn: () => [],
    initialData: [],
    staleTime: Infinity,
    gcTime: Infinity
  });
}

export function useSelectedDate() {
  return useQuery<string>({
    queryKey: dailyMealsKeys.selectedDate(),
    queryFn: () => new Date().toISOString(),
    initialData: new Date().toISOString(),
    staleTime: Infinity,
    gcTime: Infinity
  });
}

export function useSetSelectedDate() {
  const queryClient = useQueryClient();

  return (date: Date) => {
    queryClient.setQueryData<string>(
      dailyMealsKeys.selectedDate(),
      date.toISOString()
    );
  };
}

export function useAddMealToDay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({mealId, date}: {mealId: string; date: string}) => {
      const meal = await getMealById(Number(mealId));
      if (!meal) throw new Error('Meal not found');
      return {...meal, date} as MealResponse;
    },
    onSuccess: (mealWithDate) => {
      queryClient.setQueryData<MealResponse[]>(
        dailyMealsKeys.list(),
        (old = []) => [...old, mealWithDate]
      );
    }
  });
}

export function useRemoveMealFromDay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (index: number) => index,
    onSuccess: (index) => {
      queryClient.setQueryData<MealResponse[]>(
        dailyMealsKeys.list(),
        (old = []) => old.filter((_, i) => i !== index)
      );
    }
  });
}
