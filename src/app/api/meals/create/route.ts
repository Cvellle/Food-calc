import {NextRequest, NextResponse} from 'next/server';
import {inArray} from 'drizzle-orm';
import {db} from '@/lib/db';
import {meals, mealItems, items} from '@/lib/db/schema';

// Expected body: { name: string, items: { itemId: number, quantity: number, measurement?: string }[] }
export async function POST(req: NextRequest) {
  try {
    const {name, items: mealItemsInput} = await req.json();

    const [meal] = await db.insert(meals).values({name}).returning();

    const insertedMealItems = await db
      .insert(mealItems)
      .values(
        mealItemsInput.map(
          (i: {itemId: number; quantity: number; measurement?: string}) => ({
            meal_id: meal.id,
            item_id: i.itemId,
            quantity: String(i.quantity),
            measurement: i.measurement ?? 'grams'
          })
        )
      )
      .returning();

    // Fetch item details for the inserted meal items
    const itemIds = insertedMealItems.map((mi) => mi.item_id);
    const itemRows = await db
      .select()
      .from(items)
      .where(inArray(items.id, itemIds));

    const itemMap = new Map(itemRows.map((i) => [i.id, i]));

    const result = {
      ...meal,
      meal_items: insertedMealItems.map((mi) => ({
        ...mi,
        items: itemMap.get(mi.item_id)
      }))
    };

    return NextResponse.json(result, {status: 201});
  } catch {
    return NextResponse.json({error: 'Failed to create meal'}, {status: 500});
  }
}
