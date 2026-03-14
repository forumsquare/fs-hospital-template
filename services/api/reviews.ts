import { apiEndpoints, StatusCode } from "@/constants/api";
import { apiInstance, handleErr } from "@/lib/utils";
import { APISnapshotType } from "@/models/types";

export const submitReview = async (data: {
  type: string;
  review: string;
  reviewOn: string;
  rating: string;
  reviewdTo: string;
}) => {
  try {
    const response = await apiInstance.post<APISnapshotType>(
      apiEndpoints.reviews.submit,
      {
        ...data,
      }
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.message;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};
