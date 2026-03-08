import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET() {
  try {
    const meals = await prisma.meals.findMany({
      orderBy: {id: 'desc'},
      include: {
        meal_items: {
          include: {items: {select: {name: true}}}
        }
      }
    });

    // Transform to the shape the frontend MealListItem type expects
    const payload = meals.map((meal) => ({
      id: meal.id,
      name: meal.name,
      date: undefined,
      ingredients_preview: meal.meal_items
        .map((mi) => mi.items.name)
        .join(', ')
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
