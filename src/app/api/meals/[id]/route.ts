import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

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
    const meal = await prisma.meals.findUnique({
      where: {id: mealId},
      include: {
        meal_items: {
          include: {
            items: {
              include: {
                item_nutrients: {include: {nutrients: true}}
              }
            }
          }
        }
      }
    });

    if (!meal) {
      return NextResponse.json({error: 'Meal not found'}, {status: 404});
    }

    // Aggregate nutrients across all meal items
    // item_nutrients.per_100g × (meal_item.quantity / 100) = contribution
    const nutrientMap = new Map<string, {nutrient: string; unit: string; total: number}>();

    for (const mi of meal.meal_items) {
      const factor = parseFloat(mi.quantity.toString()) / 100;
      for (const n of mi.items.item_nutrients) {
        const key = n.nutrients.name;
        const contribution = parseFloat(n.per_100g.toString()) * factor;
        const existing = nutrientMap.get(key);
        if (existing) {
          existing.total += contribution;
        } else {
          nutrientMap.set(key, {nutrient: key, unit: n.nutrients.unit, total: contribution});
        }
      }
    }

    return NextResponse.json({
      id: meal.id,
      name: meal.name,
      nutrients: Array.from(nutrientMap.values()),
      items: meal.meal_items.map((mi) => ({
        name: mi.items.name,
        quantity: parseFloat(mi.quantity.toString()),
        measurement: mi.measurement
      }))
    });
  } catch (err) {
    console.error('[GET /api/meals/:id]', err);
    return NextResponse.json({error: 'Failed to fetch meal'}, {status: 500});
  }
}
