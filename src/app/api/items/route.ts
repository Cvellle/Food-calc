import {NextResponse} from 'next/server';
import {asc} from 'drizzle-orm';
import {db} from '@/lib/db';
import {items} from '@/lib/db/schema';

export async function GET() {
  try {
    const rows = await db
      .select({id: items.id, name: items.name})
      .from(items)
      .orderBy(asc(items.name));
    return NextResponse.json(rows);
  } catch (err) {
    console.error('[GET /api/items]', err);
    return NextResponse.json({error: 'Failed to fetch items'}, {status: 500});
  }
}
