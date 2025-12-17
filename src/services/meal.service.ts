import {normalizeNutrients} from '@/lib/nutrition/normalizeNutrients';
import {runPrediction} from '@/lib/nutrition/runPrediction';
import {endpoint} from '../../config/endpoint';

export const createMealAsync = async (bodyProps: {
  name: string;
  items: any[];
}) => {
  const res = await fetch(`${endpoint}/meals/create`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: bodyProps.name,
      items: bodyProps.items
    })
  });

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error || 'Failed to create meal');
  }

  const data = await res.json();

  // TensorFlow
  const score = await runPrediction(data.id);
  await updateMealHealthScore(data.id, score);

  return data;
};

export async function updateMealHealthScore(mealId: number, score: number) {
  const res = await fetch(`${endpoint}/meals/${mealId}/score`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({mealId, score})
  });

  if (!res.ok) {
    throw new Error('Failed to update meal score');
  }
  return res.json();
}
