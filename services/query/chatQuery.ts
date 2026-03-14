import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages, getUnreadCount, sendMessage, updateSeenByChatId } from "../api/chat";
import useChatMessageStore from "@/stores/chatMessage";

export const useGetMessagesQuery = (data: { page: number; limit: number }) => {
  const { chatRoomId } = useChatMessageStore();
  return useQuery({
    queryKey: qKey([apiEndpoints.chat.getChats, chatRoomId || ""]),
    queryFn: () => getMessages(chatRoomId!, data),
    enabled: !!chatRoomId,
  });
};

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();
  const { chatRoomId } = useChatMessageStore();
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qKey([apiEndpoints.chat.getChats, chatRoomId || ""]),
      });
    },
  });
};

export const useUpdateSeenMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSeenByChatId,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qKey(apiEndpoints.chat.getUnreadCount),
      });
    },
  });
};

export const useGetUnreadCountQuery = () => {
  return useQuery({
    queryKey: qKey(apiEndpoints.chat.getUnreadCount),
    queryFn: getUnreadCount,
  });
};
