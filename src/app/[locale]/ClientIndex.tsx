'use client';

import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {fetchMeals} from '@/lib/features/meals/mealsThunks';
import {useRouter} from 'next/navigation';
import {DailyMealsList} from './DailyMealsList';
import {fetchAndAddMeal} from '@/lib/features/meals/DailyMealsSlice';
import {NutrientSummary} from '../NutrientSummary';
import {useTranslations} from 'next-intl';

import {MyDayPicker} from '@/components/Calandar/MyDayPicker';
import {format} from 'date-fns';
import MyChart from '@/components/chart/MyChart';

export default function ClientIndex() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const router = useRouter();
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const meals = useAppSelector((s) => s.dailyMeals.meals);
  const loading = useAppSelector((s) => s.dailyMeals.loading);

  const {list, status, error} = useAppSelector((state) => state.meals);

  // const fetchWithAuth = useFetchWithAuth();

  // async function loadMeals() {
  //   const res = await fetchWithAuth('/meals');
  //   if (res.ok) {
  //     const data = await res.json();
  //     alert('ok');
  //   } else {
  //     alert('Failed to load meals');
  //   }
  // }

  useEffect(() => {
    dispatch(fetchMeals());
  }, []);

  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchMeals());
  //   }
  // }, [dispatch, status]);

  const handleAdd = (mealId: string) => {
    dispatch(fetchAndAddMeal({mealId, date}));
  };

  if (status === 'loading') return <p>Loading…</p>;
  if (status === 'failed') return <p>{error}</p>;

  const handleDateChange = (value: Date | undefined) => {
    if (value) {
      setDate(value);
      const formattedDate = value.toISOString().split('T')[0];
      // dispatch(fetchMeals(formattedDate));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap md:flex-nowrap gap-6 p-4">
        <div className="border rounded-xl md:p-4 bg-white shadow-sm h-fit w-fit mx-auto md:mx-0">
          <MyDayPicker selectedDate={date} onDateChange={handleDateChange} />
        </div>
        <div className="w-full md:w-[450px] shrink-0 p-4 bg-white rounded-xl shadow-sm">
          {date && date instanceof Date
            ? format(date, 'dd.MM.yyyy')
            : 'Izaberite datum'}
          <DailyMealsList date={date} />
        </div>
        <NutrientSummary selectedDate={date} />
      </div>
      <div className="my-[40px] md:my-0">
        <MyChart meals={meals} />
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
