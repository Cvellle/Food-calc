import {runPrediction} from '@/lib/nutrition/runPrediction';
import {NextResponse} from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mealId = Number(url.searchParams.get('mealId'));

  if (!mealId) {
    return NextResponse.json({error: 'mealId required'}, {status: 400});
  }

  try {
    const score = await runPrediction(mealId);
    return NextResponse.json({score});
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({error: error.message}, {status: 500});
    } else {
      return 'Unknown predict error';
    }
  }
}

// fetch('/api/predict?mealId=123')
