'use client';

import {selectAggregatedNutrients} from '@/lib/features/meals/DailyMealsSlice';
import {useAppSelector} from '@/lib/hooks';
import {NUTRIENTS} from '@/lib/nutrition/nutrients-List';
import {useTranslations} from 'next-intl';

export function NutrientSummary() {
  const nutrients = useAppSelector(selectAggregatedNutrients);
  const t = useTranslations();

  return (
    <div className="max-w-md mx-auto overflow-hidden rounded-xl border-t-8 border-emerald-600 bg-stone-50 shadow-lg">
      <div className="p-6">
        <h2 className="text-3xl font-serif font-bold text-center text-red-700 mb-6 tracking-tight italic">
          {t('DailyMeals.total')}
        </h2>

        <ul className="space-y-3">
          {Object.values(nutrients).map((n) => {
            const def = NUTRIENTS[n.nutrient as keyof typeof NUTRIENTS];

            return (
              <li
                key={n.nutrient}
                className="flex flex-wrap md:min-h-[40px] flex items-center justify-between p-3 rounded-lg border-l-4 border-emerald-500 bg-white shadow-sm hover:translate-x-1 transition-transform"
              >
                <span className="text-[15px] font-bold text-stone-700 capitalize">
                  {n.nutrient}
                </span>

                <div className="ml-[5px] mx-[auto]">
                  <span className="text-[15px] font-mono font-semibold text-red-600">
                    {n.total.toFixed(2)}
                  </span>
                  <span className="text-xs text-stone-400 ml-1 uppercase">
                    {n.unit}
                  </span>
                </div>
                {def?.max && (
                  <span className="ml-[20px] text-[15px] text-stone-400 mt-1 italic">
                    Limit: {def.max} {def.unit}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex h-1 w-full">
          <div className="flex-1 bg-emerald-600"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-red-600"></div>
        </div>
      </div>
    </div>
  );
}
