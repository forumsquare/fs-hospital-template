import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories";

export const useGetCategoriesQuery = (options?: { initialData?: any }) => {
  return useQuery({
    queryKey: qKey(apiEndpoints.categories.list),
    queryFn: getCategories,
    ...options
  });
};

