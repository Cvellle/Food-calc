export const NUTRIENTS = {
  /* =========================
   * ENERGY & MACROS
   * ========================= */
  calories: {key: 'calories', unit: 'kcal', default: 0, min: 0, max: 2000},

  protein: {key: 'protein', unit: 'g', default: 0, min: 0, max: 150},

  carbohydrates: {
    key: 'carbohydrates',
    unit: 'g',
    default: 0,
    min: 0,
    max: 300
  },

  fiber: {key: 'fiber', unit: 'g', default: 0, min: 0, max: 50},

  sugars: {key: 'sugars', unit: 'g', default: 0, min: 0, max: 100},

  'added sugars': {key: 'added sugars', unit: 'g', default: 0, min: 0, max: 50},

  starch: {key: 'starch', unit: 'g', default: 0, min: 0, max: 200},

  /* =========================
   * LIPIDS / FATS
   * ========================= */
  'total fat': {key: 'total fat', unit: 'g', default: 0, min: 0, max: 70},

  'saturated fat': {
    key: 'saturated fat',
    unit: 'g',
    default: 0,
    min: 0,
    max: 20
  },

  'monounsaturated fat': {
    key: 'monounsaturated fat',
    unit: 'g',
    default: 0,
    min: 0,
    max: 30
  },

  'polyunsaturated fat': {
    key: 'polyunsaturated fat',
    unit: 'g',
    default: 0,
    min: 0,
    max: 30
  },

  'trans fat': {key: 'trans fat', unit: 'g', default: 0, min: 0, max: 2},

  cholesterol: {key: 'cholesterol', unit: 'mg', default: 0, min: 0, max: 300},

  'omega 3': {key: 'omega 3', unit: 'g', default: 0, min: 0, max: 3},

  'omega 6': {key: 'omega 6', unit: 'g', default: 0, min: 0, max: 10},

  /* =========================
   * ELECTROLYTES & MACRO-MINERALS
   * ========================= */
  sodium: {key: 'sodium', unit: 'mg', default: 0, min: 0, max: 2300},

  potassium: {key: 'potassium', unit: 'mg', default: 0, min: 0, max: 4700},

  calcium: {key: 'calcium', unit: 'mg', default: 0, min: 0, max: 1300},

  magnesium: {key: 'magnesium', unit: 'mg', default: 0, min: 0, max: 420},

  phosphorus: {key: 'phosphorus', unit: 'mg', default: 0, min: 0, max: 1250},

  chloride: {key: 'chloride', unit: 'mg', default: 0, min: 0, max: 3600},

  sulfur: {key: 'sulfur', unit: 'mg', default: 0, min: 0, max: 1500},

  /* =========================
   * TRACE MINERALS
   * ========================= */
  iron: {key: 'iron', unit: 'mg', default: 0, min: 0, max: 45},

  zinc: {key: 'zinc', unit: 'mg', default: 0, min: 0, max: 40},

  copper: {key: 'copper', unit: 'mg', default: 0, min: 0, max: 10},

  manganese: {key: 'manganese', unit: 'mg', default: 0, min: 0, max: 10},

  selenium: {key: 'selenium', unit: 'µg', default: 0, min: 0, max: 400},

  iodine: {key: 'iodine', unit: 'µg', default: 0, min: 0, max: 1100},

  chromium: {key: 'chromium', unit: 'µg', default: 0, min: 0, max: 1000},

  molybdenum: {key: 'molybdenum', unit: 'µg', default: 0, min: 0, max: 2000},

  fluoride: {key: 'fluoride', unit: 'mg', default: 0, min: 0, max: 10},

  cobalt: {key: 'cobalt', unit: 'µg', default: 0, min: 0, max: 100},

  /* =========================
   * FAT-SOLUBLE VITAMINS
   * ========================= */
  'vitamin A': {key: 'vitamin A', unit: 'µg', default: 0, min: 0, max: 3000},

  'beta carotene': {
    key: 'beta carotene',
    unit: 'µg',
    default: 0,
    min: 0,
    max: 15000
  },

  'vitamin D': {key: 'vitamin D', unit: 'µg', default: 0, min: 0, max: 100},

  'vitamin E': {key: 'vitamin E', unit: 'mg', default: 0, min: 0, max: 100},

  'vitamin K': {key: 'vitamin K', unit: 'µg', default: 0, min: 0, max: 1200},

  /* =========================
   * WATER-SOLUBLE VITAMINS
   * ========================= */
  thiamin: {key: 'thiamin', unit: 'mg', default: 0, min: 0, max: 10}, // B1

  riboflavin: {key: 'riboflavin', unit: 'mg', default: 0, min: 0, max: 10}, // B2

  niacin: {key: 'niacin', unit: 'mg', default: 0, min: 0, max: 50}, // B3

  pantothenic: {
    key: 'pantothenic acid',
    unit: 'mg',
    default: 0,
    min: 0,
    max: 20
  }, // B5

  'vitamin B6': {key: 'vitamin B6', unit: 'mg', default: 0, min: 0, max: 25},

  biotin: {key: 'biotin', unit: 'µg', default: 0, min: 0, max: 500},

  folate: {key: 'folate', unit: 'µg', default: 0, min: 0, max: 1000},

  'vitamin B12': {key: 'vitamin B12', unit: 'µg', default: 0, min: 0, max: 100},

  'vitamin C': {key: 'vitamin C', unit: 'mg', default: 0, min: 0, max: 2000},

  choline: {key: 'choline', unit: 'mg', default: 0, min: 0, max: 3500},

  /* =========================
   * AMINO ACIDS (ESSENTIAL)
   * ========================= */
  histidine: {key: 'histidine', unit: 'g', default: 0, min: 0, max: 10},

  isoleucine: {key: 'isoleucine', unit: 'g', default: 0, min: 0, max: 15},

  leucine: {key: 'leucine', unit: 'g', default: 0, min: 0, max: 25},

  lysine: {key: 'lysine', unit: 'g', default: 0, min: 0, max: 25},

  methionine: {key: 'methionine', unit: 'g', default: 0, min: 0, max: 15},

  phenylalanine: {key: 'phenylalanine', unit: 'g', default: 0, min: 0, max: 20},

  threonine: {key: 'threonine', unit: 'g', default: 0, min: 0, max: 15},

  tryptophan: {key: 'tryptophan', unit: 'g', default: 0, min: 0, max: 5},

  valine: {key: 'valine', unit: 'g', default: 0, min: 0, max: 20},

  /* =========================
   * AMINO ACIDS (NON-ESSENTIAL)
   * ========================= */
  alanine: {key: 'alanine', unit: 'g', default: 0, min: 0, max: 20},

  arginine: {key: 'arginine', unit: 'g', default: 0, min: 0, max: 15},

  aspartic: {key: 'aspartic acid', unit: 'g', default: 0, min: 0, max: 25},

  cysteine: {key: 'cysteine', unit: 'g', default: 0, min: 0, max: 10},

  glutamic: {key: 'glutamic acid', unit: 'g', default: 0, min: 0, max: 40},

  glycine: {key: 'glycine', unit: 'g', default: 0, min: 0, max: 15},

  proline: {key: 'proline', unit: 'g', default: 0, min: 0, max: 20},

  serine: {key: 'serine', unit: 'g', default: 0, min: 0, max: 15},

  tyrosine: {key: 'tyrosine', unit: 'g', default: 0, min: 0, max: 15},

  /* =========================
   * OTHER COMPOUNDS
   * ========================= */
  caffeine: {key: 'caffeine', unit: 'mg', default: 0, min: 0, max: 500},

  alcohol: {key: 'alcohol', unit: 'g', default: 0, min: 0, max: 50},

  water: {key: 'water', unit: 'g', default: 0, min: 0, max: 1500},

  phytosterols: {key: 'phytosterols', unit: 'mg', default: 0, min: 0, max: 300},

  polyphenols: {key: 'polyphenols', unit: 'mg', default: 0, min: 0, max: 1000}
} as const;
