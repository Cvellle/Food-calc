'use client';

import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {fetchMeals} from '@/lib/features/meals/mealsThunks';
import {useRouter} from 'next/navigation';
import {DailyMealsList} from './DailyMealsList';
import {fetchAndAddMeal} from '@/lib/features/meals/DailyMealsSlice';
import {NutrientSummary} from '../NutrientSummary';
import {useTranslations} from 'next-intl';

export default function ClientIndex() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const t = useTranslations();

  const loading = useAppSelector((s) => s.dailyMeals.loading);

  const {list, status, error} = useAppSelector((state) => state.meals);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMeals());
    }
  }, [dispatch, status]);

  const handleAdd = (mealId: string) => {
    dispatch(fetchAndAddMeal(mealId));
  };

  if (status === 'loading') return <p>Loading…</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-[100%] md:w-[60%] p-[35px]">
          <DailyMealsList />
        </div>
        <NutrientSummary />
      </div>
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-6 justify-center
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-4"
      >
        {list.map((post) => (
          <div
            key={post.id}
            className="
            bg-white rounded-lg shadow-md p-6
            hover:shadow-xl transition-shadow duration-300
            flex flex-col
            min-h-[300px]
          "
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              {t('MealCard.name')}
            </h3>
            <p className="mb-5 text-gray-800">{post.name}</p>

            <h4 className="text-lg font-medium mb-2 text-gray-700">
              {t('MealCard.allIngredients')}
            </h4>
            <p className="text-gray-600 flex-grow">
              {post.ingredients_preview}
            </p>

            <button
              type="button"
              className="
              mt-4
              inline-block
              px-5 py-2
              bg-emerald-600
              text-white
              font-semibold
              rounded-md
              shadow-sm
              hover:bg-emerald-700
              focus:outline-none
              focus:ring-2
              focus:ring-red-400
              transition
              duration-300
              cursor-pointer
            "
              onClick={() => router.push(`/meals/${post.id}`)}
            >
              {t('MealCard.see')}
            </button>
            <button
              type="button"
              className="
              mt-4
              inline-block
              px-5 py-2
              bg-red-600
              text-white
              font-semibold
              rounded-md
              shadow-sm
              hover:bg-red-700
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-400
              transition
              duration-300
              cursor-pointer
            "
              onClick={() => handleAdd(String(post.id))}
            >
              {t('MealCard.add')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
