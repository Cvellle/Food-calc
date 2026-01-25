// import {NUTRIENTS} from '@/lib/nutrition/nutrients-List';
// import {createSelector} from '@reduxjs/toolkit';

// export const selectExceededNutrients = createSelector(
//   [selectAggregatedNutrients],
//   (totals) => {
//     return Object.values(totals).filter((n) => {
//       const def = NUTRIENTS[n.nutrient as keyof typeof NUTRIENTS];
//       return def?.max !== undefined && n.total > def.max;
//     });
//   }
// );
