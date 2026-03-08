'use client';

import {useQuery} from '@tanstack/react-query';
import {itemsKeys} from './items-keys';
import {getItems} from './items-actions';
import {STALE_TIMES, GC_TIMES} from '@/lib/query-config';

export function useItems() {
  return useQuery({
    queryKey: itemsKeys.list(),
    queryFn: () => getItems(),
    staleTime: STALE_TIMES.static,
    gcTime: GC_TIMES.static
  });
}
