import {NextResponse} from 'next/server';
import {getMeals} from '@/services/meals';

export async function GET() {
  const posts = await getMeals();
  return NextResponse.json(posts);
}
