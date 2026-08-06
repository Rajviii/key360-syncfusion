'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProviderFactory } from '@/providers/ProviderFactory';

export function useModuleMutation<T = any>(moduleId: string) {
  const queryClient = useQueryClient();
  const provider = ProviderFactory.getProvider();

  const createMutation = useMutation({
    mutationFn: (newRecord: Partial<T>) => provider.createRecord<T>(moduleId, newRecord),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moduleData', moduleId] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, record }: { id: string | number; record: Partial<T> }) =>
      provider.updateRecord<T>(moduleId, id, record),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moduleData', moduleId] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => provider.deleteRecord(moduleId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moduleData', moduleId] });
    }
  });

  return {
    createRecord: createMutation.mutateAsync,
    updateRecord: updateMutation.mutateAsync,
    deleteRecord: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
