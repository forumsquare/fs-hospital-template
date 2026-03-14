import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getServicesList } from "../api/servises";

export const useGetServicesQuery = (data: { categoryId: string }) => {
  return useQuery({
    queryKey: qKey([apiEndpoints.services.list, data.categoryId]),
    queryFn: () => getServicesList(data),
  });
};
