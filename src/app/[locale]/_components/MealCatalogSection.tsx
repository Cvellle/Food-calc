'use client';

import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {fetchMeals} from '@/lib/features/meals/mealsThunks';
import {selectSelectedDate} from '@/lib/features/meals/DailyMealsSlice';
import {useAddMealToDayMutation} from '@/lib/features/meals/dailyMealsApi';
import {useTranslations} from 'next-intl';
import {MealCard} from './MealCard';

export function MealCatalogSection() {
  const dispatch = useAppDispatch();
  const t = useTranslations();

  const {list, status, error} = useAppSelector((state) => state.meals);
  const selectedDateISO = useAppSelector(selectSelectedDate);
  const [search, setSearch] = useState('');

  const [addMealToDay] = useAddMealToDayMutation();

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  const labels = {
    name: t('MealCard.name'),
    allIngredients: t('MealCard.allIngredients'),
    see: t('MealCard.see'),
    add: t('MealCard.add')
  };

  const handleAdd = (mealId: string) => {
    addMealToDay({mealId, date: new Date(selectedDateISO).toISOString()});
  };

  if (status === 'loading') return <p>Loading…</p>;
  if (status === 'failed') return <p>{error}</p>;

  const filtered = list.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="my-4">
        <input
          type="text"
          placeholder={t('MealCard.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm border border-gray-300 rounded px-3 h-[38px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div
        className="grid gap-6 justify-center
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-4"
      >
        {filtered.map((meal) => (
          <MealCard key={meal.id} meal={meal} onAdd={handleAdd} labels={labels} />
        ))}
      </div>
    </div>
  );
}
