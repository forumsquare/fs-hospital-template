import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getFacilitiesList } from "../api/facilities";

export const useGetFacilitiesQuery = (specializationId?: string, options?: { initialData?: any }) => {
    return useQuery({
        queryKey: specializationId
            ? qKey([apiEndpoints.facilities.list, specializationId])
            : qKey(apiEndpoints.facilities.list),
        queryFn: () => getFacilitiesList(specializationId),
        ...options
    });
};
