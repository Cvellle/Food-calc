// lib/nutrients/runPrediction.ts

import {fetchAllNutrients} from './dataService';
import {mapNutrientsToFeatures} from './normalizeNutrients';
import {predictNutritionScore} from './tfModel';

export async function runPrediction(mealId: number) {
  const nutrients = await fetchAllNutrients(mealId);
  const features = mapNutrientsToFeatures(nutrients);
  const score = await predictNutritionScore(features);
  return score;
}
