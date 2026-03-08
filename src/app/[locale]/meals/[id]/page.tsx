'use client';

import {useParams} from 'next/navigation';
import {useMealById} from '@/lib/features/meals/use-meals';

export default function MealDetailPage() {
  const {id} = useParams();
  const {data: meal, isLoading, error} = useMealById(id as string);

  if (isLoading) return <p>Loading meal details…</p>;
  if (error) return <p>{error.message}</p>;
  if (!meal) return <p>Meal not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6">{meal.name}</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Nutrients</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {meal.nutrients.map(({nutrient, unit, total}) => (
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
          {meal.items.map(({name, quantity, measurement}, i) => (
            <li key={i}>
              {name} — {quantity} {measurement}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
