'use client';

import {useState} from 'react';
import {useMeals} from '@/lib/features/meals/use-meals';
import {useSelectedDate} from '@/lib/features/daily-meals/use-daily-meals';
import {useAddMealToDay} from '@/lib/features/daily-meals/use-daily-meals';
import {useTranslations} from 'next-intl';
import {MealCard} from './MealCard';

export function MealCatalogSection() {
  const t = useTranslations();

  const {data: list = [], isLoading, error} = useMeals();
  const {data: selectedDateISO = new Date().toISOString()} = useSelectedDate();
  const [search, setSearch] = useState('');

  const addMealToDay = useAddMealToDay();

  const labels = {
    name: t('MealCard.name'),
    allIngredients: t('MealCard.allIngredients'),
    see: t('MealCard.see'),
    add: t('MealCard.add')
  };

  const handleAdd = (mealId: string) => {
    addMealToDay.mutate({mealId, date: new Date(selectedDateISO).toISOString()});
  };

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>{error.message}</p>;

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
