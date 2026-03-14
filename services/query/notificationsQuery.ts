import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
} from "../api/notifications";
import { auth } from "@/lib/firebase";

export const useGetNotificationsQuery = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: qKey(apiEndpoints.notification.history),
    queryFn: () => getNotifications({ page, limit }),
  });
};

export const useGetUnreadCountQuery = (isLoggedIn: any) => {
  // if (!isLoggedIn) {
  //   return {
  //     data: 0,
  //     isLoading: false,
  //     isError: false,
  //     isSuccess: true,
  //   };
  // }

  return useQuery({
    queryKey: qKey(apiEndpoints.notification.unreadCount),
    queryFn: getUnreadCount,
  });
};

export const useMarkAsReadQuery = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.notification.updateSingle),
    mutationFn: (notificationId: string) => markAsRead(notificationId),
    onSuccess: () => {},
  });
};
