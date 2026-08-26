import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useStoreId } from "@/components/providers/StoreProvider";
import { getCategories } from "../api/categories";

export const useGetCategoriesQuery = (options?: { initialData?: any }) => {
  const storeId = useStoreId();
  return useQuery({
    queryKey: qKey([apiEndpoints.categories.list, storeId]),
    queryFn: () => getCategories(storeId),
    ...options
  });
};

