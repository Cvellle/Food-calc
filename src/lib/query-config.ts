import type {QueryClient} from '@tanstack/react-query';

export const STALE_TIMES = {
  /** Data that rarely changes (items catalog, nutrients) */
  static: 5 * 60 * 1000, // 5 min
  /** Data that changes moderately (meals list) */
  standard: 60 * 1000, // 1 min
  /** Data that should be fresh (auth state) */
  fresh: 0
} as const;

export const GC_TIMES = {
  static: 30 * 60 * 1000, // 30 min
  standard: 10 * 60 * 1000, // 10 min
  fresh: 5 * 60 * 1000 // 5 min
} as const;

export function createQueryConfig(): ConstructorParameters<typeof QueryClient>[0] {
  return {
    defaultOptions: {
      queries: {
        staleTime: STALE_TIMES.standard,
        gcTime: GC_TIMES.standard,
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  };
}
