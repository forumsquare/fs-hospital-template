import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
} from "../api/notifications";
import { useSession } from "@/hooks/useSession";

export const useGetNotificationsQuery = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const { isLoggedIn } = useSession();
  return useQuery({
    queryKey: qKey([
      apiEndpoints.notification.history,
      String(page),
      String(limit),
    ]),
    queryFn: () => getNotifications({ page, limit }),
    enabled: isLoggedIn,
  });
};

export const useGetUnreadCountQuery = () => {
  const { isLoggedIn } = useSession();
  return useQuery({
    queryKey: qKey(apiEndpoints.notification.unreadCount),
    queryFn: getUnreadCount,
    // Previously this took an `isLoggedIn` argument and ignored it — the guard
    // was commented out — so the query ran regardless of auth state.
    enabled: isLoggedIn,
  });
};

export const useMarkAsReadQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: qKey(apiEndpoints.notification.updateSingle),
    mutationFn: (notificationId: string) => markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qKey(apiEndpoints.notification.history),
      });
      queryClient.invalidateQueries({
        queryKey: qKey(apiEndpoints.notification.unreadCount),
      });
    },
  });
};
