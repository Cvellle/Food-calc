'use server';

import {asc} from 'drizzle-orm';
import {db} from '@/lib/db';
import {items} from '@/lib/db/schema';

export type ItemOption = {id: number; name: string};

export async function getItems(): Promise<ItemOption[]> {
  return db
    .select({id: items.id, name: items.name})
    .from(items)
    .orderBy(asc(items.name));
}
