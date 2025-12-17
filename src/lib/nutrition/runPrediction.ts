// lib/nutrients/runPrediction.ts

import {fetchAllNutrients} from './dataService';
import {normalizeNutrients} from './normalizeNutrients';
import {predictNutritionScore} from './tfModel';

export async function runPrediction(mealId: number) {
  const nutrients = await fetchAllNutrients(mealId);
  const features = normalizeNutrients(nutrients);
  const score = await predictNutritionScore(features);
  return score;
}
