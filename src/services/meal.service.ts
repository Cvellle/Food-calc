import {normalizeNutrients} from '@/lib/nutrition/normalizeNutrients';
import {runPrediction} from '@/lib/nutrition/runPrediction';
import {endpoint} from '../../config/endpoint';

export const createMealAsync = async (bodyProps: {
  name: string;
  items: any[];
}) => {
  const res = await fetch(`${endpoint}/meals/create`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: bodyProps.name,
      items: bodyProps.items
    })
  });

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error || 'Failed to create meal');
  }

  const data = await res.json();

  // TensorFlow
  const score = await runPrediction(data.id);
  await updateMealHealthScore(data.id, score);

  return data;
};

export async function updateMealHealthScore(mealId: number, score: number) {
  const res = await fetch(`${endpoint}/meals/${mealId}/score`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({mealId, score})
  });

  if (!res.ok) {
    throw new Error('Failed to update meal score');
  }
  return res.json();
}

// const meal = await createMeal();
// await addMealItems(meal.id);

// const nutrients = await aggregateNutrients(meal.id);
// const features = normalizeNutrients(nutrients, DAILY_RANGES);
// const score = await predictNutritionScore(features);

// await updateMealScore(meal.id, score);

// import {sql} from '../db';
// import {DAILY_RANGES} from '../nutrients/ranges';
// import {normalizeNutrients} from '../nutrients/normalize';
// import {predictNutritionScore} from '../ml/predict';

// export async function createMealAndPredict(
//   name: string,
//   items: {
//     itemId: number;
//     quantity: number;
//     measurement: 'grams' | 'unit';
//   }[]
// ) {
//   const [meal] = await sql`
//     INSERT INTO meals (name)
//     VALUES (${name})
//     RETURNING id, name;
//   `;

//   for (const item of items) {
//     await sql`
//       INSERT INTO meal_items (meal_id, item_id, quantity, measurement)
//       VALUES (${meal.id}, ${item.itemId}, ${item.quantity}, ${item.measurement});
//     `;
//   }

//   // Aggregate nutrients
//   const nutrients = await sql`
//     SELECT
//       n.nutrient,
//       n.unit,
//       SUM(n.value_per_unit * mi.quantity) AS total
//     FROM meal_items mi
//     JOIN item_nutrients n ON n.item_id = mi.item_id
//     WHERE mi.meal_id = ${meal.id}
//     GROUP BY n.nutrient, n.unit;
//   `;

//   const features = normalizeNutrients(nutrients, DAILY_RANGES);

//   const score = await predictNutritionScore(features);

//   await sql`
//     UPDATE meals
//     SET health_score = ${score}
//     WHERE id = ${meal.id};
//   `;

//   return {
//     meal: {...meal, healthScore: score},
//     nutrients
//   };
// }
