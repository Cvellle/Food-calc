import {NextResponse} from 'next/server';
import {getMeals} from '@/services/meals';

export async function GET() {
  const meals = await getMeals();
  return NextResponse.json(meals);
}
