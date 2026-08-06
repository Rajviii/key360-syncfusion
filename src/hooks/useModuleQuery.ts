'use client';

import { useQuery } from '@tanstack/react-query';
import { ProviderFactory } from '@/providers/ProviderFactory';
import { QueryParams, FetchResult } from '@/types/provider';

export function useModuleQuery<T = any>(
  moduleId: string,
  viewId: string,
  params: QueryParams = {},
  providerType?: 'mock' | 'rest' | 'mcp'
) {
  const activeProvider = ProviderFactory.getProvider(providerType);

  return useQuery<FetchResult<T>, Error>({
    queryKey: ['moduleData', moduleId, viewId, activeProvider.type, params],
    queryFn: async () => {
      return activeProvider.fetchData<T>(moduleId, viewId, params);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
}
