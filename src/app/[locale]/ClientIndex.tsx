'use client';

import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {fetchMeals} from '@/lib/features/meals/mealsThunks';

export default function ClientIndex() {
  const dispatch = useAppDispatch();
  const {nutrients, status, error} = useAppSelector((state) => state.meals);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMeals());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <p>Loading…</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <>
      {nutrients.map((post) => (
        <div key={post.nutrient}>
          <p>{post.nutrient}</p>
          <p>
            {post.total.toFixed(2)} {post.unit}
          </p>
        </div>
      ))}
    </>
  );
}
