import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

// Placeholder hooks for future backend integration
// Currently the backend is empty, so these are prepared for when backend methods are added

export function useGetConversations() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      if (!actor) return [];
      // When backend is ready: return actor.getConversations();
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateConversation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vehicleNumber: string) => {
      if (!actor) throw new Error('Actor not initialized');
      // When backend is ready: return actor.createConversation(vehicleNumber);
      return { id: Date.now().toString(), vehicleNumber };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useSendMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ conversationId, message }: { conversationId: string; message: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      // When backend is ready: return actor.sendMessage(conversationId, message);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}
