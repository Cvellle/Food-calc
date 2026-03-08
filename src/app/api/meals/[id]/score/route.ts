import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

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

    const meal = await prisma.meals.update({
      where: {id: mealId},
      data: {health_score: score}
    });

    return NextResponse.json(meal);
  } catch {
    return NextResponse.json({error: 'Failed to update score'}, {status: 500});
  }
}
