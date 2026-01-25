export const NUTRIENTS = {
  calories: {key: 'calories', unit: 'kcal', default: 0, min: 1500, max: 2500},
  protein: {key: 'protein', unit: 'g', default: 0, min: 50, max: 175},
  carbohydrates: {
    key: 'carbohydrates',
    unit: 'g',
    default: 0,
    min: 130,
    max: 300
  },
  sugars: {key: 'sugars', unit: 'g', default: 0, min: 0, max: 50},
  fiber: {key: 'fiber', unit: 'g', default: 0, min: 25, max: 38},
  'total fat': {key: 'total fat', unit: 'g', default: 0, min: 44, max: 77},
  iron: {key: 'iron', unit: 'mg', default: 0, min: 8, max: 18},
  'vitamin C': {key: 'vitamin C', unit: 'mg', default: 0, min: 75, max: 90},
  potassium: {key: 'potassium', unit: 'mg', default: 0, min: 2600, max: 3400},
  'vitamin A': {key: 'vitamin A', unit: 'µg', default: 0, min: 700, max: 900}
} as const;

export type NutrientKey = keyof typeof NUTRIENTS;

export interface Nutrient {
  nutrient: string;
  unit: string;
  total: number;
}

export type FeatureVector = Record<NutrientKey, number>;

export type NutritionResult = {
  score: number;
  flags: string[];
};

export type MealDetails = {
  nutrients: {
    nutrient: string;
    unit: string;
    total: number;
  }[];
  items: any[];
};

export type NutrientEntry = {
  nutrient: string;
  unit: string;
  total: number;
};

export type MealItem = {
  name: string;
  quantity: number;
  measurement: string;
};

export type MealResponse = {
  nutrients: NutrientEntry[];
  items: MealItem[];
};

export type Suggestion = {
  id: string;
  title: string;
  reason: string;
  confidence?: number; // from TF model
};
