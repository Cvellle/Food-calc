import {NextRequest, NextResponse} from 'next/server';
import {eq} from 'drizzle-orm';
import {db} from '@/lib/db';
import {meals} from '@/lib/db/schema';

export async function PATCH(
  req: NextRequest,
  {params}: {params: Promise<{id: string}>}
) {
  const {id} = await params;
  const mealId = parseInt(id, 10);

  if (isNaN(mealId)) {
    return NextResponse.json({error: 'Invalid meal id'}, {status: 400});
  }

  try {
    const {score} = await req.json();

    const [meal] = await db
      .update(meals)
      .set({health_score: String(score)})
      .where(eq(meals.id, mealId))
      .returning();

    return NextResponse.json(meal);
  } catch {
    return NextResponse.json({error: 'Failed to update score'}, {status: 500});
  }
}
