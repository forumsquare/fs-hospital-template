import { apiEndpoints, StatusCode } from "@/constants/api";
import { storeId } from "@/constants/constant";
import { apiInstance, handleErr } from "@/lib/utils";
import { APISnapshotType } from "@/models/types";

export const getCategories = async (): Promise<
  {
    id: string;
    name: string;
    image: string;
    description: string;
    specializationId: string;
  }[]
> => {
  try {
    const response = await apiInstance.get<APISnapshotType>(
      apiEndpoints.categories.list.replace(":storeId", storeId)
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};
