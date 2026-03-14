import { apiEndpoints, StatusCode } from "@/constants/api";
import { storeId } from "@/constants/constant";
import { apiInstance, handleErr } from "@/lib/utils";
import { AddressType, DoctorDetailsType, DoctorType, UserReviewType } from "@/models/schema";
import { APISnapshotType } from "@/models/types";
import { format } from "date-fns";

export const getDoctorsList = async (): Promise<DoctorType[]> => {
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
  doctorId,
  page,
  limit,
  sortBy,
  isAscending,
}: {
  doctorId: string;
  page: number;
  limit: number;
  sortBy: "RATING" | "DATE";
  isAscending: boolean;
}): Promise<UserReviewType[]> => {
  try {
    const response = await apiInstance.get<APISnapshotType>(
      `${apiEndpoints.consultant.getReviews.replace(
        ":consultantId",
        doctorId
      )}?page=${page}&limit=${limit}&sortBy=${sortBy}&isAscending=${isAscending}`
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
