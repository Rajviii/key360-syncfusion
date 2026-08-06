'use client';

import '@/lib/syncfusion-license';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UIPreferencesProvider } from '@/context/UIPreferencesContext';
import '@/data/modules/registry';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UIPreferencesProvider>{children}</UIPreferencesProvider>
    </QueryClientProvider>
  );
};
