import {NUTRIENTS} from '@/lib/nutrition/nutrients-List';
import type {NutrientEntry} from '@/lib/nutrition/types';

export function getExceededNutrients(totals: NutrientEntry[]) {
  return totals.filter((n) => {
    const def = NUTRIENTS[n.nutrient as keyof typeof NUTRIENTS];
    return def?.max !== undefined && n.total > def.max;
  });
}
