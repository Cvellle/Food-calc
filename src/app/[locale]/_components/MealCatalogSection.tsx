'use client';

import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {fetchMeals} from '@/lib/features/meals/mealsThunks';
import {
  fetchAndAddMeal,
  selectSelectedDate
} from '@/lib/features/meals/DailyMealsSlice';
import {useTranslations} from 'next-intl';
import {MealCard} from './MealCard';

export function MealCatalogSection() {
  const dispatch = useAppDispatch();
  const t = useTranslations();

  const {list, status, error} = useAppSelector((state) => state.meals);
  const selectedDateISO = useAppSelector(selectSelectedDate);

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
    dispatch(fetchAndAddMeal({mealId, date: new Date(selectedDateISO)}));
  };

  if (status === 'loading') return <p>Loading…</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-6 justify-center
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  xl:grid-cols-4"
    >
      {list.map((meal) => (
        <MealCard key={meal.id} meal={meal} onAdd={handleAdd} labels={labels} />
      ))}
    </div>
  );
}
