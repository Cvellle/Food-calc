// import { NextResponse } from 'next/server';
// import { createMealAndPredict } from '@/lib/services/meal.service';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const result = await createMealAndPredict(
//       body.name,
//       body.items
//     );

//     return NextResponse.json(result, { status: 201 });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json(
//       { error: err.message },
//       { status: 500 }
//     );
//   }
// }
