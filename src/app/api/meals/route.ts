import {getMeals} from '@/services/meals';
import {NextResponse} from 'next/server';

export async function GET() {
  try {
    const meals = await getMeals();

    return NextResponse.json(meals, {
      headers: {
        'Access-Control-Allow-Origin': '*', // or specific origin
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
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
