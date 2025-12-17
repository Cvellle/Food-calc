import {endpoint} from '../../../config/endpoint';

export interface Nutrient {
  nutrient: string;
  unit: string;
  total: number;
}

export async function fetchAllNutrients(mealId: number): Promise<Nutrient[]> {
  const res = await fetch(`${endpoint}/${mealId}/nutrients`);
  if (!res.ok) throw new Error('Failed to fetch nutrients');
  const data: Nutrient[] = await res.json();
  return data;
}
