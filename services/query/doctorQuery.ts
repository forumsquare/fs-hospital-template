import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  getConsultantAddresses,
  getDoctorById,
  getDoctorReviews,
  getDoctorsList,
  getSlots,
} from "../api/doctor";

export const useGetDoctorListQuery = (options?: { initialData?: any }) => {
  return useQuery({
    queryKey: qKey(apiEndpoints.consultant.list),
    queryFn: getDoctorsList,
    ...options
  });
};

export const useGetDoctorByIdQuery = (id: string) => {
  return useQuery({
    queryKey: qKey([apiEndpoints.consultant.getDoctor, id]),
    queryFn: () => getDoctorById(id),
  });
};

export const useGetDoctorReviewsQuery = (
  data: {
    doctorId: string;
    page: number;
    limit: number;
    sortBy: "RATING" | "DATE";
    isAscending: boolean;
  },
  options?: { initialData?: any }
) => {
  return useQuery({
    queryKey: qKey([apiEndpoints.consultant.getReviews, data.doctorId, data.page.toString(), data.limit.toString(), data.sortBy, data.isAscending.toString()]),
    queryFn: () => getDoctorReviews(data),
    ...options
  });
};

export const useGetSlotsQuery = (data: {
  doctorId: string;
  addressId: string;
  date: string;
}) => {
  return useQuery({
    // addressId and date are both sent to the API, so both must be in the key.
    // Without them, picking a different date or clinic re-used the first
    // result's cached slots — showing availability for the wrong day.
    queryKey: qKey([
      apiEndpoints.consultant.getSlots,
      data.doctorId,
      data.addressId,
      data.date,
    ]),
    queryFn: () => getSlots(data),
    enabled: !!data.doctorId && !!data.addressId && !!data.date,
  });
};

export const useGetConsultantAddressesQuery = (consultantId: string) => {
  return useQuery({
    queryKey: qKey([apiEndpoints.consultant.getAddresses, consultantId]),
    queryFn: () => getConsultantAddresses(consultantId),
    enabled: !!consultantId,
  });
};