'use client';

import {useMemo} from 'react';
import {useAppSelector} from '@/lib/hooks';
import {selectMeals} from '@/lib/features/meals/DailyMealsSlice';
import {NUTRIENTS} from '@/lib/nutrition/nutrients-List';
import {useTranslations} from 'next-intl';
import {isSameDay} from 'date-fns';

interface Props {
  selectedDate: Date | undefined;
}

export function NutrientSummary({selectedDate}: Props) {
  const allMeals = useAppSelector(selectMeals);
  const t = useTranslations();

  const filteredMeals = useMemo(() => {
    if (!selectedDate) return [];
    return allMeals.filter((meal: any) => {
      if (!meal.date) return false;
      try {
        return isSameDay(new Date(meal.date), selectedDate);
      } catch {
        return false;
      }
    });
  }, [allMeals, selectedDate]);

  const dailyNutrients = useMemo(() => {
    const totals: Record<
      string,
      {nutrient: string; total: number; unit: string}
    > = {};
    filteredMeals.forEach((meal) => {
      meal.nutrients.forEach((n: any) => {
        if (!totals[n.nutrient]) {
          totals[n.nutrient] = {...n};
        } else {
          totals[n.nutrient].total += n.total;
        }
      });
    });
    return Object.values(totals);
  }, [filteredMeals]);

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden rounded-xl border-t-8 border-emerald-600 bg-stone-50 shadow-lg transition-all duration-300">
      <div className="p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-red-700 mb-6 tracking-tight italic">
          {t('DailyMeals.total')}
        </h2>

        {dailyNutrients.length === 0 ? (
          <p className="text-center text-stone-400 italic py-6 text-sm">
            No meals for this date.
          </p>
        ) : (
          <ul className="space-y-3">
            {dailyNutrients.map((n) => {
              const def = NUTRIENTS[n.nutrient as keyof typeof NUTRIENTS];
              const isOver = def?.max && n.total > def.max;

              return (
                <li
                  key={n.nutrient}
                  className={`flex flex-col sm:flex-row flex-wrap min-h-[50px] sm:min-h-[40px] items-start sm:items-center justify-between p-3 rounded-lg border-l-4 bg-white shadow-sm hover:translate-x-1 transition-transform ${
                    isOver ? 'border-red-500' : 'border-emerald-500'
                  }`}
                >
                  <span className="text-[14px] sm:text-[15px] font-bold text-stone-700 capitalize w-full sm:w-auto">
                    {n.nutrient}
                  </span>

                  <div className="flex items-center gap-1 mt-1 sm:mt-0 sm:mx-auto">
                    <span
                      className={`text-[14px] sm:text-[15px] font-mono font-semibold ${isOver ? 'text-red-600' : 'text-emerald-700'}`}
                    >
                      {n.total.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase font-medium">
                      {n.unit}
                    </span>
                  </div>

                  {def?.max && (
                    <span className="text-[11px] sm:text-[13px] text-stone-400 mt-1 sm:mt-0 sm:ml-4 italic whitespace-nowrap">
                      Limit: {def.max} {def.unit}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-8 flex h-1 w-full">
          <div className="flex-1 bg-emerald-600"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-red-600"></div>
        </div>
      </div>
    </div>
  );
}
