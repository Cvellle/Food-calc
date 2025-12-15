// src/lib/features/meals/types.ts

export interface Nutrient {
  nutrient: string;
  unit: string;
  total: number;
}

export interface Item {
  name: string;
  quantity: number;
  measurement: string;
}

export interface MealsResponse {
  nutrients: Nutrient[];
  items: Item[];
}
