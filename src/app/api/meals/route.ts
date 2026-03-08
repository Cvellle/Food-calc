import {NextResponse} from 'next/server';
import {eq} from 'drizzle-orm';
import {db} from '@/lib/db';
import {meals, mealItems, items} from '@/lib/db/schema';

export async function GET() {
  try {
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

    // Group by meal
    const mealMap = new Map<
      number,
      {id: number; name: string; items: string[]}
    >();

    for (const row of rows) {
      if (!mealMap.has(row.meal_id)) {
        mealMap.set(row.meal_id, {
          id: row.meal_id,
          name: row.meal_name,
          items: []
        });
      }
      if (row.item_name) {
        mealMap.get(row.meal_id)!.items.push(row.item_name);
      }
    }

    const payload = Array.from(mealMap.values())
      .reverse()
      .map((m) => ({
        id: m.id,
        name: m.name,
        date: undefined,
        ingredients_preview: m.items.join(', ')
      }));

    return NextResponse.json(payload);
  } catch (err) {
    console.error('[GET /api/meals]', err);
    return NextResponse.json({error: 'Failed to fetch meals'}, {status: 500});
  }
}

export async function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
