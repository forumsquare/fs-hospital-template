import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useStoreId } from "@/components/providers/StoreProvider";
import { getFacilitiesList } from "../api/facilities";

export const useGetFacilitiesQuery = (specializationId?: string, options?: { initialData?: any }) => {
    const storeId = useStoreId();
    return useQuery({
        queryKey: specializationId
            ? qKey([apiEndpoints.facilities.list, storeId, specializationId])
            : qKey([apiEndpoints.facilities.list, storeId]),
        queryFn: () => getFacilitiesList(storeId, specializationId),
        ...options
    });
};
