import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useAdminAuth } from './useAdminAuth';
import type { QuoteRequest } from '../backend';

export function useAdminQuotes() {
  const { actor, isFetching: actorFetching } = useActor();
  const { isAdmin } = useAdminAuth();

  return useQuery<Array<QuoteRequest>>({
    queryKey: ['allQuoteRequests'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllQuoteRequests();
    },
    enabled: !!actor && !actorFetching && isAdmin,
    retry: false,
  });
}
