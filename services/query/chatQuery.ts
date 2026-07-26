import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages, getUnreadCount, sendMessage, updateSeenByChatId } from "../api/chat";
import useChatMessageStore from "@/stores/chatMessage";
import { useSession } from "@/hooks/useSession";

export const useGetMessagesQuery = (data: { page: number; limit: number }) => {
  const { chatRoomId } = useChatMessageStore();
  const { isLoggedIn } = useSession();
  return useQuery({
    // page/limit are part of what is fetched, so they belong in the key —
    // otherwise page 2 is served page 1's cached result.
    queryKey: qKey([
      apiEndpoints.chat.getChats,
      chatRoomId || "",
      String(data.page),
      String(data.limit),
    ]),
    queryFn: () => getMessages(chatRoomId!, data),
    enabled: isLoggedIn && !!chatRoomId,
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
  const { isLoggedIn } = useSession();
  return useQuery({
    queryKey: qKey(apiEndpoints.chat.getUnreadCount),
    queryFn: getUnreadCount,
    // ChatBot renders on every page, so without this the endpoint was called
    // on every route while signed out and 401'd each time.
    enabled: isLoggedIn,
  });
};
