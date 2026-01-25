'use client';

import {useParams} from 'next/navigation';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {clearSelectedMeal} from '@/lib/features/meals/mealsSlice';
import {fetchMealById} from '@/lib/features/meals/mealsThunks';

export default function MealDetailPage() {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const {selectedMeal, status, error} = useAppSelector((state) => state.meals);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchMealById(id as string));

    return () => {
      dispatch(clearSelectedMeal());
    };
  }, [dispatch, id]);

  if (status === 'loading') return <p>Loading meal details…</p>;
  if (status === 'failed') return <p>{error}</p>;
  if (!selectedMeal) return <p>Meal not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6">{selectedMeal.name}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Nutrients</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {selectedMeal.nutrients.map(({nutrient, unit, total}) => (
            <li
              key={nutrient}
              className="border border-emerald-300 rounded p-4 flex justify-between"
            >
              <span className="font-medium">{nutrient}</span>
              <span>
                {total.toFixed(2)} {unit}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc list-inside">
          {selectedMeal.items.map(({name, quantity, measurement}, i) => (
            <li key={i}>
              {name} — {quantity} {measurement}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
