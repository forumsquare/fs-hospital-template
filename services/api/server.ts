import "server-only";

import { apiEndpoints, StatusCode } from "@/constants/api";
import { storeId } from "@/constants/constant";
import { CategoryType, DoctorDetailsType, DoctorType, FacilityType, ProcedureType, StoreInfoType, TestimonialType, UserReviewType } from "@/models/schema";
import { APISnapshotType } from "@/models/types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchPublicData = async <T>(path: string, tags: string[] = []): Promise<T> => {
  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    next: { tags, revalidate: 0 }, // Set revalidate to 0 for immediate reflection
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const payload = (await response.json()) as APISnapshotType;
  if (payload.status !== StatusCode.OK) {
    throw new Error(payload.message ?? "Request failed");
  }

  return payload.data as T;
};

export const getDoctorsListSSR = async (): Promise<DoctorType[]> => {
  const path = apiEndpoints.consultant.list.replace(":storeId", storeId);
  return fetchPublicData<DoctorType[]>(path, ["doctors"]);
};

export const getProceduresListSSR = async (): Promise<ProcedureType[]> => {
  const path = apiEndpoints.procedures.list.replace(":storeId", storeId);
  return fetchPublicData<ProcedureType[]>(path, ["procedures"]);
};

export const getTestimonialsSSR = async (): Promise<TestimonialType[]> => {
  const path = apiEndpoints.testimonials.list.replace(":storeId", storeId);
  return fetchPublicData<TestimonialType[]>(path, ["testimonials"]);
};

export const getDoctorByIdSSR = async (id: string): Promise<DoctorDetailsType> => {
  const path = apiEndpoints.consultant.getDoctor.replace(":consultantId", id);
  return fetchPublicData<DoctorDetailsType>(path, ["doctors", id]);
};

export const getCategoriesSSR = async (): Promise<CategoryType[]> => {
  const path = apiEndpoints.categories.list.replace(":storeId", storeId);
  return fetchPublicData<CategoryType[]>(path, ["categories"]);
};

export const getDoctorReviewsSSR = async (data: {
  doctorId: string;
  page: number;
  limit: number;
  sortBy: "RATING" | "DATE";
  isAscending: boolean;
}): Promise<UserReviewType[]> => {
  const path = `${apiEndpoints.consultant.getReviews.replace(
    ":consultantId",
    data.doctorId
  )}?page=${data.page}&limit=${data.limit}&sortBy=${data.sortBy}&isAscending=${data.isAscending}`;
  return fetchPublicData<UserReviewType[]>(path, ["reviews", data.doctorId]);
};

export const getProceduresBySpecializationSSR = async (specializationId: string): Promise<ProcedureType[]> => {
  const path = `${apiEndpoints.procedures.list.replace(":storeId", storeId)}?specialization=${specializationId}`;
  return fetchPublicData<ProcedureType[]>(path, ["procedures", specializationId]);
};

export const getFacilitiesBySpecializationSSR = async (specializationId: string): Promise<FacilityType[]> => {
  const path = `${apiEndpoints.facilities.list.replace(":storeId", storeId)}?specialization=${specializationId}`;
  return fetchPublicData<FacilityType[]>(path, ["facilities", specializationId]);
};

export const getStoreInfoSSR = async (): Promise<StoreInfoType> => {
  const path = apiEndpoints.store.get.replace(":storeId", storeId);
  return fetchPublicData<StoreInfoType>(path, ["store"]);
};
