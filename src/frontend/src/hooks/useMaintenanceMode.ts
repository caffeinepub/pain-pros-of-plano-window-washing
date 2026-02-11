import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useMaintenanceMode() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<boolean>({
    queryKey: ['maintenanceMode'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isMaintenanceMode();
    },
    enabled: !!actor && !actorFetching,
    retry: 1,
    retryDelay: 1000,
    // Default to false (not in maintenance) on error to ensure public pages load
    placeholderData: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    // Ensure we have a boolean value, defaulting to false
    data: query.data ?? false,
  };
}

export function useSetMaintenanceMode() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mode: boolean) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      await actor.setMaintenanceMode(mode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceMode'] });
    },
  });
}
