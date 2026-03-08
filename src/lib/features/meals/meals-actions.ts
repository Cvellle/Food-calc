'use server';

import {eq} from 'drizzle-orm';
import {db} from '@/lib/db';
import {meals, mealItems, items, itemNutrients, nutrients} from '@/lib/db/schema';
import {inArray} from 'drizzle-orm';
import type {MealListItem, MealDetails} from './types';

export async function getMeals(): Promise<MealListItem[]> {
  const rows = await db
    .select({
      meal_id: meals.id,
      meal_name: meals.name,
      item_name: items.name
    })
    .from(meals)
    .leftJoin(mealItems, eq(mealItems.meal_id, meals.id))
    .leftJoin(items, eq(items.id, mealItems.item_id))
    .orderBy(meals.id);

  const mealMap = new Map<number, {id: number; name: string; items: string[]}>();

  for (const row of rows) {
    if (!mealMap.has(row.meal_id)) {
      mealMap.set(row.meal_id, {id: row.meal_id, name: row.meal_name, items: []});
    }
    if (row.item_name) {
      mealMap.get(row.meal_id)!.items.push(row.item_name);
    }
  }

  return Array.from(mealMap.values())
    .reverse()
    .map((m) => ({
      id: m.id,
      name: m.name,
      date: undefined,
      ingredients_preview: m.items.join(', ')
    }));
}

export async function getMealById(mealId: number): Promise<MealDetails | null> {
  const [meal] = await db.select().from(meals).where(eq(meals.id, mealId));

  if (!meal) return null;

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

  const nutrientMap = new Map<string, {nutrient: string; unit: string; total: number}>();
  const itemSet = new Map<string, {name: string; quantity: number; measurement: string}>();

  for (const row of rows) {
    if (!itemSet.has(row.item_name)) {
      itemSet.set(row.item_name, {
        name: row.item_name,
        quantity: parseFloat(row.mi_quantity),
        measurement: row.mi_measurement
      });
    }

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

  return {
    id: meal.id,
    name: meal.name,
    nutrients: Array.from(nutrientMap.values()),
    items: Array.from(itemSet.values())
  };
}

export async function createMeal(payload: {
  name: string;
  items: {itemId: number; quantity: number; measurement?: string}[];
}) {
  const [meal] = await db.insert(meals).values({name: payload.name}).returning();

  await db.insert(mealItems).values(
    payload.items.map((i) => ({
      meal_id: meal.id,
      item_id: i.itemId,
      quantity: String(i.quantity),
      measurement: i.measurement ?? 'grams'
    }))
  );

  return meal;
}

export async function updateMealScore(mealId: number, score: number) {
  const [meal] = await db
    .update(meals)
    .set({health_score: String(score)})
    .where(eq(meals.id, mealId))
    .returning();

  return meal;
}
