import { apiEndpoints, StatusCode } from "@/constants/api";
import { apiInstance, handleErr } from "@/lib/utils";
import { APISnapshotType } from "@/models/types";

export const getServicesList = async ({
  storeId,
  categoryId,
}: {
  storeId: string;
  categoryId: string;
}) => {
  try {
    const response = await apiInstance.get<APISnapshotType>(
      `${apiEndpoints.services.list.replace(
        ":storeId",
        storeId
      )}?categoryId=${categoryId}`
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};
