'use client';

import {removeMeal} from '@/lib/features/meals/DailyMealsSlice';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {useTranslations} from 'next-intl';

export function DailyMealsList() {
  const meals = useAppSelector((s) => s.dailyMeals.meals);
  const dispatch = useAppDispatch();
  const t = useTranslations();

  return (
    <div className="space-y-4 rounded-xl border border-green-200 p-4">
      <h2 className="text-xl font-semibold text-green-700">
        {t('DailyMeals.title')}
      </h2>

      {meals.length === 0 && (
        <p className="text-sm text-gray-500">No meals added yet.</p>
      )}

      {meals.map((meal, index) => (
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
