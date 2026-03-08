import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

// Expected body: { name: string, items: { itemId: number, quantity: number, measurement?: string }[] }
export async function POST(req: NextRequest) {
  try {
    const {name, items} = await req.json();

    const meal = await prisma.meals.create({
      data: {
        name,
        meal_items: {
          create: items.map((i: {itemId: number; quantity: number; measurement?: string}) => ({
            item_id: i.itemId,
            quantity: i.quantity,
            measurement: i.measurement ?? 'grams'
          }))
        }
      },
      include: {meal_items: {include: {items: true}}}
    });

    return NextResponse.json(meal, {status: 201});
  } catch {
    return NextResponse.json({error: 'Failed to create meal'}, {status: 500});
  }
}
