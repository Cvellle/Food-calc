export interface MealListItem {
  id: number;
  name: string;
  ingredients_preview: string;
}

export interface MealDetails {
  id: number;
  name: string;
  nutrients: any[];
  items: any[];
}
