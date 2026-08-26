import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useStoreId } from "@/components/providers/StoreProvider";
import { getServicesList } from "../api/servises";

export const useGetServicesQuery = (data: { categoryId: string }) => {
  const storeId = useStoreId();
  return useQuery({
    queryKey: qKey([apiEndpoints.services.list, storeId, data.categoryId]),
    queryFn: () => getServicesList({ ...data, storeId }),
  });
};
