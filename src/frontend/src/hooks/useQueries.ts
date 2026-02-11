import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { QuoteRequest } from '../backend';

export function useSubmitQuoteRequest() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: Omit<QuoteRequest, 'createdBy'>) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      
      // Determine who is submitting the quote
      const createdBy = identity 
        ? identity.getPrincipal().toString() 
        : 'anonymous';
      
      const fullRequest: QuoteRequest = {
        ...request,
        createdBy
      };
      
      await actor.submitQuoteRequest(fullRequest);
    },
    onSuccess: () => {
      // Invalidate any quote-related queries
      queryClient.invalidateQueries({ queryKey: ['quoteRequest'] });
      queryClient.invalidateQueries({ queryKey: ['allQuoteRequests'] });
    }
  });
}
