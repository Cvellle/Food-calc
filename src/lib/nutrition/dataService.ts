import {endpoint} from '../../../config/endpoint';
import {MealDetails} from './types';

export interface Nutrient {
  nutrient: string;
  unit: string;
  total: number;
}

export async function fetchAllNutrients(mealId: number): Promise<Nutrient[]> {
  const res = await fetch(`${endpoint}/meals/${mealId}`);
  if (!res.ok) throw new Error('Failed to fetch nutrients');
  const data: any = await res.json();
  return data.nutrients;
}
