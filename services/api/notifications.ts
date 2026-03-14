import { apiEndpoints, StatusCode } from "@/constants/api";
import { auth } from "@/lib/firebase";
import { apiInstance, handleErr } from "@/lib/utils";
import { NotificationType } from "@/models/schema";
import { APISnapshotType } from "@/models/types";

export const getNotifications = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<NotificationType[]> => {
  try {
    const response = await apiInstance.get<APISnapshotType>(
      `${apiEndpoints.notification.history}?page=${page}&limit=${limit}`
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getUnreadCount = async (): Promise<any> => {
  const isLoggedIn = auth.currentUser;
  if (!isLoggedIn) {
    return null;
  }
  try {
    const response = await apiInstance.get<APISnapshotType>(
      apiEndpoints.notification.unreadCount
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const markAsRead = async (notificationId: string): Promise<any> => {
  try {
    const response = await apiInstance.put<APISnapshotType>(
      apiEndpoints.notification.updateSingle.replace(
        ":notificationId",
        notificationId
      )
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};
