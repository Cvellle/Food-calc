import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.items.findMany({
      select: {id: true, name: true},
      orderBy: {name: 'asc'}
    });
    return NextResponse.json(items);
  } catch (err) {
    console.error('[GET /api/items]', err);
    return NextResponse.json({error: 'Failed to fetch items'}, {status: 500});
  }
}
