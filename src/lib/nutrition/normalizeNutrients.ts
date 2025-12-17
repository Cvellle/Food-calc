import {Nutrient, NutrientKey, NUTRIENTS} from './types';

export function normalizeNutrients(mealNutrients: Nutrient[]): number[] {
  return (Object.keys(NUTRIENTS) as NutrientKey[]).map((key) => {
    const {min, max} = NUTRIENTS[key];
    const mealValue =
      mealNutrients.find((n) => n.nutrient.toLowerCase() === key.toLowerCase())
        ?.total ?? 0;

    if (max === min) return 0;
    let normalized = (mealValue - min) / (max - min);
    normalized = Math.min(Math.max(normalized, 0), 1); // clamp 0-1
    return normalized;
  });
}
