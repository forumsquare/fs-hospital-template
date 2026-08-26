import { apiEndpoints, StatusCode } from "@/constants/api";
import { apiInstance, handleErr } from "@/lib/utils";
import { AddressType, DoctorDetailsType, DoctorType, UserReviewType } from "@/models/schema";
import { APISnapshotType } from "@/models/types";
import { format } from "date-fns";

export const getDoctorsList = async (storeId: string): Promise<DoctorType[]> => {
  try {
    const response = await apiInstance.get<APISnapshotType>(
      apiEndpoints.consultant.list.replace(":storeId", storeId)
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getDoctorById = async (
  doctorId: string
): Promise<DoctorDetailsType> => {
  try {
    const response = await apiInstance.get<APISnapshotType>(
      apiEndpoints.consultant.getDoctor.replace(":consultantId", doctorId)
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getDoctorReviews = async ({
  storeId,
  doctorId,
  page,
  limit,
  sortBy,
  isAscending,
}: {
  storeId: string;
  doctorId: string;
  page: number;
  limit: number;
  sortBy: "RATING" | "DATE";
  isAscending: boolean;
}): Promise<UserReviewType[]> => {
  try {
    const url = doctorId
      ? apiEndpoints.consultant.getReviews.replace(":consultantId", doctorId)
      : apiEndpoints.store.getReviews.replace(":storeId", storeId);

    const response = await apiInstance.get<APISnapshotType>(
      `${url}?page=${page}&limit=${limit}&sortBy=${sortBy}&isAscending=${isAscending}`
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getSlots = async ({
  doctorId,
  addressId,
  date,
}: {
  doctorId: string;
  addressId: string;
  date: string;
}) => {
  try {
    const response = await apiInstance.get<APISnapshotType>(
      `${apiEndpoints.consultant.getSlots.replace(
        ":consultantId",
        doctorId
      )}?addressId=${addressId}&date=${format(new Date(date), "yyyy-MM-dd")}`
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getConsultantAddresses = async (
  consultantId: string
): Promise<AddressType[]> => {
  try {
    const response = await apiInstance.get<APISnapshotType>(
      apiEndpoints.consultant.getAddresses.replace(
        ":consultantId",
        consultantId
      )
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr({ e: error });
  }
};
