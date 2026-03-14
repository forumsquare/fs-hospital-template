import { apiEndpoints, StatusCode } from "@/constants/api";
import { apiInstance, handleErr } from "@/lib/utils";
import { UserType } from "@/models/schema";
import { APISnapshotType } from "@/models/types";

export const updateUser = async (user: UserType): Promise<any> => {
  try {
    const response = await apiInstance.put<APISnapshotType>(
      apiEndpoints.user.update,
      { ...user, dob: new Date(user.dob!) }
    );
    console.log({ response });
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
  } catch (error) {
    handleErr(error);
  }
};

export const getUserInfo = async () => {
  try {
    const response = await apiInstance.get<APISnapshotType>(
      apiEndpoints.user.update
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
