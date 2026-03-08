'use client';

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {mealsKeys} from './meals-keys';
import {getMeals, getMealById, createMeal, updateMealScore} from './meals-actions';
import {STALE_TIMES, GC_TIMES} from '@/lib/query-config';
import {runPrediction} from '@/lib/nutrition/runPrediction';

export function useMeals() {
  return useQuery({
    queryKey: mealsKeys.lists(),
    queryFn: () => getMeals(),
    staleTime: STALE_TIMES.standard,
    gcTime: GC_TIMES.standard
  });
}

export function useMealById(id: number | string) {
  return useQuery({
    queryKey: mealsKeys.detail(id),
    queryFn: () => getMealById(Number(id)),
    staleTime: STALE_TIMES.standard,
    gcTime: GC_TIMES.standard,
    enabled: !!id
  });
}

export function useCreateMeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      name: string;
      items: {itemId: number; quantity: number; measurement?: string}[];
    }) => {
      const meal = await createMeal(payload);

      // TensorFlow health score
      const score = await runPrediction(meal.id);
      await updateMealScore(meal.id, score);

      return meal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: mealsKeys.lists()});
    }
  });
}
