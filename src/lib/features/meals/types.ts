import {Nutrient} from '@/lib/nutrition/types';

export interface MealListItem {
  id: number;
  name: string;
  date: Date | undefined;
  ingredients_preview: string;
}

export interface MealDetails {
  id: number;
  name: string;
  nutrients: Nutrient[];
  items: any[];
}
