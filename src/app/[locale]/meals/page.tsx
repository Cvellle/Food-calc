'use client';

import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {fetchMeals} from '@/lib/features/meals/mealsThunks';
import {useRouter} from 'next/navigation';

export default function MealsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {list, status, error} = useAppSelector((state) => state.meals);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMeals());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <p>Loading meals…</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-6
      grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
    >
      {list.map((meal) => (
        <div
          key={meal.id}
          className="bg-white rounded-lg shadow-md p-6
            hover:shadow-xl transition-shadow duration-300
            flex flex-col min-h-[300px]"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            {meal.name}
          </h3>

          <p className="text-gray-600 flex-grow">{meal.ingredients_preview}</p>

          <button
            type="button"
            className="mt-4 inline-block px-5 py-2 bg-red-600 text-white font-semibold rounded-md
              shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-green-400
              transition duration-300 cursor-pointer"
            onClick={() => router.push(`/meals/${meal.id}`)}
          >
            See meal
          </button>
        </div>
      ))}
    </div>
  );
}
