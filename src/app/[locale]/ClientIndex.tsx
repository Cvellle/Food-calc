'use client';

import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {fetchMeals} from '@/lib/features/meals/mealsThunks';
import {useRouter} from 'next/navigation';

export default function ClientIndex() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {list, status, error} = useAppSelector((state) => state.meals);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMeals());
    }
  }, [dispatch, status]);

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
            Meal name:
          </h3>
          <p className="mb-5 text-gray-800">{post.name}</p>

          <h4 className="text-lg font-medium mb-2 text-gray-700">
            Ingredients used:
          </h4>
          <p className="text-gray-600 flex-grow">{post.ingredients_preview}</p>

          <button
            type="button"
            className="
              mt-4
              inline-block
              px-5 py-2
              bg-blue-600
              text-white
              font-semibold
              rounded-md
              shadow-sm
              hover:bg-blue-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-400
              transition
              duration-300
              cursor-pointer
            "
            onClick={() => router.push(`/meals/${post.id}`)}
          >
            See meal
          </button>
        </div>
      ))}
    </div>
  );
}
