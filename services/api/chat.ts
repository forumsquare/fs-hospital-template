import { apiEndpoints, StatusCode } from "@/constants/api";
import { storeId, wsBaseUrl } from "@/constants/constant";
import { getCookie } from "@/lib/serverCom";
import { accessToken, apiInstance, handleErr } from "@/lib/utils";
import { APISnapshotType } from "@/models/types";
import useChatMessageStore from "@/stores/chatMessage";

export const getMessages = async (
  chatRoomId: string,
  data: { page: number; limit: number }
) => {
  const isLoggedIn = await getCookie("refreshToken");

  if (!isLoggedIn) return null;
  try {
    const response = await apiInstance.get<APISnapshotType>(
      `${apiEndpoints.chat.getChats.replace(":chatId", chatRoomId)}?page=${data.page
      }&limit=${data.limit}`
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const sendMessage = async (data: {
  chatId?: string | null;
  message: string;
  storeId: string;
}) => {
  try {
    const formData = new FormData();
    if (data.chatId) formData.append("chatId", data.chatId);
    formData.append("message", data.message);
    formData.append("storeId", data.storeId);

    const response = await apiInstance.post<APISnapshotType>(
      apiEndpoints.chat.sendMessage,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const updateSeenByChatId = async (data: {
  chatId: string;
  lastSeenMsgId: string;
}) => {
  try {
    const response = await apiInstance.patch<APISnapshotType>(
      apiEndpoints.chat.updateSeen.replace(":chatId", data.chatId),
      { lastSeenMsgId: data.lastSeenMsgId }
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getUnreadCount = async () => {
  try {
    const response = await apiInstance.get<APISnapshotType>(
      apiEndpoints.chat.getUnreadCount + "?storeId=" + storeId,
      // @ts-expect-error: skipAuthRefresh is a custom property for axios interceptors
      { skipAuthRefresh: true }
    );
    console.log({ response });
    // if (response.data.status === StatusCode.OK) {
    return (response.data as APISnapshotType).data;
    // }
    // throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

// websocat -v --text "wss://api.forumsquare.in/ws/chat?storeId=ff7b53d0-2891-4791-b8d0-fe6320a05a1a"
// --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNjAxMDMzOC0zZTYzLTRkYTUtYTZmYS03ZTYxZjI4NmMwZDIiLCJhdXRoVHlwZSI6IkVNQUlMIiwidHlwZSI6IlVTRVIiLCJleHAiOjE3NDU0NzQ0MTN9.CYHvCEG7ZE-B1BFDP8nn0mKFqaH3dAmFq09b2-CUAuM"
