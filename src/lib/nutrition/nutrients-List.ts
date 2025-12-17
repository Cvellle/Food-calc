or should go here in nutrients.ts for tensorflow?
// how to add this to file
const nutrients = await fetchAllNutrients();
const { featureVector, thresholds } = mapNutrientsToFeatures(nutrients);

const inputTensor = tf.tensor2d([featureVector]);
// model.predict(inputTensor)


// lib/nutrients.ts
export const NUTRIENTS = {
  /* =========================
   * ENERGY & MACROS
   * ========================= */
  calories: {key: 'calories', unit: 'kcal', default: 0},

  protein: {key: 'protein', unit: 'g', default: 0},

  carbohydrates: {key: 'carbohydrates', unit: 'g', default: 0},

  fiber: {key: 'fiber', unit: 'g', default: 0},

  sugars: {key: 'sugars', unit: 'g', default: 0},

  'added sugars': {key: 'added sugars', unit: 'g', default: 0},

  starch: {key: 'starch', unit: 'g', default: 0},

  /* =========================
   * LIPIDS / FATS
   * ========================= */
  'total fat': {key: 'total fat', unit: 'g', default: 0},

  'saturated fat': {key: 'saturated fat', unit: 'g', default: 0},

  'monounsaturated fat': {key: 'monounsaturated fat', unit: 'g', default: 0},

  'polyunsaturated fat': {key: 'polyunsaturated fat', unit: 'g', default: 0},

  'trans fat': {key: 'trans fat', unit: 'g', default: 0},

  cholesterol: {key: 'cholesterol', unit: 'mg', default: 0},

  'omega 3': {key: 'omega 3', unit: 'g', default: 0},

  'omega 6': {key: 'omega 6', unit: 'g', default: 0},

  /* =========================
   * ELECTROLYTES & MACRO-MINERALS
   * ========================= */
  sodium: {key: 'sodium', unit: 'mg', default: 0},

  potassium: {key: 'potassium', unit: 'mg', default: 0},

  calcium: {key: 'calcium', unit: 'mg', default: 0},

  magnesium: {key: 'magnesium', unit: 'mg', default: 0},

  phosphorus: {key: 'phosphorus', unit: 'mg', default: 0},

  chloride: {key: 'chloride', unit: 'mg', default: 0},

  sulfur: {key: 'sulfur', unit: 'mg', default: 0},

  /* =========================
   * TRACE MINERALS
   * ========================= */
  iron: {key: 'iron', unit: 'mg', default: 0},

  zinc: {key: 'zinc', unit: 'mg', default: 0},

  copper: {key: 'copper', unit: 'mg', default: 0},

  manganese: {key: 'manganese', unit: 'mg', default: 0},

  selenium: {key: 'selenium', unit: 'µg', default: 0},

  iodine: {key: 'iodine', unit: 'µg', default: 0},

  chromium: {key: 'chromium', unit: 'µg', default: 0},

  molybdenum: {key: 'molybdenum', unit: 'µg', default: 0},

  fluoride: {key: 'fluoride', unit: 'mg', default: 0},

  cobalt: {key: 'cobalt', unit: 'µg', default: 0},

  /* =========================
   * FAT-SOLUBLE VITAMINS
   * ========================= */
  'vitamin A': {key: 'vitamin A', unit: 'µg', default: 0},

  'beta carotene': {key: 'beta carotene', unit: 'µg', default: 0},

  'vitamin D': {key: 'vitamin D', unit: 'µg', default: 0},

  'vitamin E': {key: 'vitamin E', unit: 'mg', default: 0},

  'vitamin K': {key: 'vitamin K', unit: 'µg', default: 0},

  /* =========================
   * WATER-SOLUBLE VITAMINS
   * ========================= */
  thiamin: {key: 'thiamin', unit: 'mg', default: 0}, // B1
  riboflavin: {key: 'riboflavin', unit: 'mg', default: 0}, // B2
  niacin: {key: 'niacin', unit: 'mg', default: 0}, // B3
  pantothenic: {key: 'pantothenic acid', unit: 'mg', default: 0}, // B5
  'vitamin B6': {key: 'vitamin B6', unit: 'mg', default: 0},
  biotin: {key: 'biotin', unit: 'µg', default: 0}, // B7
  folate: {key: 'folate', unit: 'µg', default: 0}, // B9
  'vitamin B12': {key: 'vitamin B12', unit: 'µg', default: 0},
  'vitamin C': {key: 'vitamin C', unit: 'mg', default: 0},

  choline: {key: 'choline', unit: 'mg', default: 0},

  /* =========================
   * AMINO ACIDS (ESSENTIAL)
   * ========================= */
  histidine: {key: 'histidine', unit: 'g', default: 0},
  isoleucine: {key: 'isoleucine', unit: 'g', default: 0},
  leucine: {key: 'leucine', unit: 'g', default: 0},
  lysine: {key: 'lysine', unit: 'g', default: 0},
  methionine: {key: 'methionine', unit: 'g', default: 0},
  phenylalanine: {key: 'phenylalanine', unit: 'g', default: 0},
  threonine: {key: 'threonine', unit: 'g', default: 0},
  tryptophan: {key: 'tryptophan', unit: 'g', default: 0},
  valine: {key: 'valine', unit: 'g', default: 0},

  /* =========================
   * AMINO ACIDS (NON-ESSENTIAL)
   * ========================= */
  alanine: {key: 'alanine', unit: 'g', default: 0},
  arginine: {key: 'arginine', unit: 'g', default: 0},
  aspartic: {key: 'aspartic acid', unit: 'g', default: 0},
  cysteine: {key: 'cysteine', unit: 'g', default: 0},
  glutamic: {key: 'glutamic acid', unit: 'g', default: 0},
  glycine: {key: 'glycine', unit: 'g', default: 0},
  proline: {key: 'proline', unit: 'g', default: 0},
  serine: {key: 'serine', unit: 'g', default: 0},
  tyrosine: {key: 'tyrosine', unit: 'g', default: 0},

  /* =========================
   * OTHER COMPOUNDS
   * ========================= */
  caffeine: {key: 'caffeine', unit: 'mg', default: 0},

  alcohol: {key: 'alcohol', unit: 'g', default: 0},

  water: {key: 'water', unit: 'g', default: 0},

  phytosterols: {key: 'phytosterols', unit: 'mg', default: 0},

  polyphenols: {key: 'polyphenols', unit: 'mg', default: 0}
} as const;
