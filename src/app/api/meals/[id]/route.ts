import {NextRequest, NextResponse} from 'next/server';
import {eq} from 'drizzle-orm';
import {db} from '@/lib/db';
import {meals, mealItems, items, itemNutrients, nutrients} from '@/lib/db/schema';

export async function GET(
  _req: NextRequest,
  {params}: {params: Promise<{id: string}>}
) {
  const {id} = await params;
  const mealId = parseInt(id, 10);

  if (isNaN(mealId)) {
    return NextResponse.json({error: 'Invalid meal id'}, {status: 400});
  }

  try {
    const [meal] = await db
      .select()
      .from(meals)
      .where(eq(meals.id, mealId));

    if (!meal) {
      return NextResponse.json({error: 'Meal not found'}, {status: 404});
    }

    // Fetch meal items with their items and nutrients in one query
    const rows = await db
      .select({
        mi_quantity: mealItems.quantity,
        mi_measurement: mealItems.measurement,
        item_name: items.name,
        per_100g: itemNutrients.per_100g,
        nutrient_name: nutrients.name,
        nutrient_unit: nutrients.unit
      })
      .from(mealItems)
      .innerJoin(items, eq(items.id, mealItems.item_id))
      .leftJoin(itemNutrients, eq(itemNutrients.item_id, items.id))
      .leftJoin(nutrients, eq(nutrients.id, itemNutrients.nutrient_id))
      .where(eq(mealItems.meal_id, mealId));

    // Aggregate nutrients
    const nutrientMap = new Map<string, {nutrient: string; unit: string; total: number}>();
    const itemSet = new Map<string, {name: string; quantity: number; measurement: string}>();

    for (const row of rows) {
      // Track unique items
      if (!itemSet.has(row.item_name)) {
        itemSet.set(row.item_name, {
          name: row.item_name,
          quantity: parseFloat(row.mi_quantity),
          measurement: row.mi_measurement
        });
      }

      // Aggregate nutrients
      if (row.nutrient_name && row.per_100g) {
        const factor = parseFloat(row.mi_quantity) / 100;
        const contribution = parseFloat(row.per_100g) * factor;
        const existing = nutrientMap.get(row.nutrient_name);
        if (existing) {
          existing.total += contribution;
        } else {
          nutrientMap.set(row.nutrient_name, {
            nutrient: row.nutrient_name,
            unit: row.nutrient_unit!,
            total: contribution
          });
        }
      }
    }

    return NextResponse.json({
      id: meal.id,
      name: meal.name,
      nutrients: Array.from(nutrientMap.values()),
      items: Array.from(itemSet.values())
    });
  } catch (err) {
    console.error('[GET /api/meals/:id]', err);
    return NextResponse.json({error: 'Failed to fetch meal'}, {status: 500});
  }
}
