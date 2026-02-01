'use client';

import {removeMeal} from '@/lib/features/meals/DailyMealsSlice';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {useTranslations} from 'next-intl';
import {format} from 'date-fns';
import {useEffect} from 'react';
import MyChart from '@/components/chart/MyChart';

type DailyMealsListProps = {
  date?: Date;
};

export function DailyMealsList({date}: DailyMealsListProps) {
  const meals = useAppSelector((s) => s.dailyMeals.meals);
  const dispatch = useAppDispatch();
  const t = useTranslations();

  const getList = () => {
    if (!date) return meals;

    const selected = format(date, 'yyyy-MM-dd');

    return meals.filter((post: any) => {
      if (!post.date) return false;
      const mealDate = post.date;
      return format(mealDate, 'yyyy-MM-dd') === selected;
    });
  };

  const filteredMeals = getList();

  return (
    <div className="space-y-4 rounded-xl border border-green-200 p-4">
      <h2 className="text-xl font-semibold text-green-700">
        {t('DailyMeals.title')}
      </h2>

      {filteredMeals.length === 0 && (
        <p className="text-sm text-gray-500">No meals added yet.</p>
      )}

      {filteredMeals.map((meal, index) => (
        <div
          key={index}
          className="rounded-lg border border-green-100 bg-white p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <strong className="text-green-800">Meal {index + 1}</strong>

            <button
              onClick={() => dispatch(removeMeal(index))}
              className="cursor-pointer rounded-md bg-red-600 px-3
                py-1 text-sm font-medium text-white hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>

          <ul className="list-disc pl-5 text-sm text-gray-700">
            {meal.items.map((item, i) => (
              <li key={i}>
                {item.name} – {item.quantity} {item.measurement}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
