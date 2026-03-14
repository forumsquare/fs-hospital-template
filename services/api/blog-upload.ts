import { apiEndpoints, StatusCode } from "@/constants/api";
import { apiInstance, handleErr } from "@/lib/utils";
import { APISnapshotType } from "@/models/types";

export const uploadBlog = async (file: any): Promise<any> => {
  try {
    const response = await apiInstance.post<APISnapshotType>(
      apiEndpoints.base.blob,
      {
        file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log({ response });
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};
