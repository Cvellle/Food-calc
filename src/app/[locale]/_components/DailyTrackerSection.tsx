'use client';

import {useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {
  selectSelectedDate,
  setSelectedDate
} from '@/lib/features/meals/DailyMealsSlice';
import {
  useAllMealsQuery,
  useRemoveMealFromDayMutation
} from '@/lib/features/meals/dailyMealsApi';
import {useTranslations} from 'next-intl';
import {isSameDay, format} from 'date-fns';
import {MyDayPicker} from '@/components/Calandar/MyDayPicker';
import {DailyMealsList} from '../DailyMealsList';
import {NutrientSummary} from '../../NutrientSummary';
import MyChart from '@/components/chart/MyChart';
import type {NutrientEntry} from '@/lib/nutrition/types';

export function DailyTrackerSection() {
  const dispatch = useAppDispatch();
  const t = useTranslations();

  const selectedDateISO = useAppSelector(selectSelectedDate);
  const {data: allMeals = []} = useAllMealsQuery();
  const [removeMealFromDay] = useRemoveMealFromDayMutation();

  const date = new Date(selectedDateISO);

  const filteredMeals = useMemo(
    () =>
      allMeals.filter((meal: any) => {
        if (!meal.date) return false;
        try {
          return isSameDay(new Date(meal.date), date);
        } catch {
          return false;
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allMeals, selectedDateISO]
  );

  const nutrients = useMemo<NutrientEntry[]>(() => {
    const totals: Record<string, NutrientEntry> = {};
    filteredMeals.forEach((meal: any) => {
      meal.nutrients.forEach((n: NutrientEntry) => {
        if (!totals[n.nutrient]) totals[n.nutrient] = {...n};
        else totals[n.nutrient].total += n.total;
      });
    });
    return Object.values(totals);
  }, [filteredMeals]);

  const handleDateChange = (value: Date | undefined) => {
    if (value) dispatch(setSelectedDate(value.toISOString()));
  };

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap gap-6 md:p-4">
        <div className="w-[100%] my-start rounded-xl mt-[20px] md:mt-0 md:p-4 bg-white shadow-sm h-fit mx-auto md:mx-0">
          <MyDayPicker selectedDate={date} onDateChange={handleDateChange} />
        </div>

        <div className="w-full md:w-[450px] shrink-0 p-4 bg-white rounded-xl shadow-sm">
          {format(date, 'dd.MM.yyyy')}
          <DailyMealsList
            meals={filteredMeals}
            onRemove={(index) => removeMealFromDay(index)}
            title={t('DailyMeals.title')}
          />
        </div>

        <NutrientSummary nutrients={nutrients} title={t('DailyMeals.total')} />
      </div>

      <div className="my-[40px] md:my-[5px] md:mb-[45px] px-4">
        <MyChart meals={allMeals} />
      </div>
    </>
  );
}
