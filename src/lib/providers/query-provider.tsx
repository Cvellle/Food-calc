'use client';

import {useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createQueryConfig} from '@/lib/query-config';

export function QueryProvider({children}: {children: React.ReactNode}) {
  const [queryClient] = useState(() => new QueryClient(createQueryConfig()));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
