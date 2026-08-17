import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useStoreId } from "@/components/providers/StoreProvider";
import { getProcedureById, getProceduresList } from "../api/procedure";

export const useGetProceduresListQuery = (specializationId?: string, options?: { initialData?: any }) => {
    const storeId = useStoreId();
    return useQuery({
        queryKey: specializationId
            ? qKey([apiEndpoints.procedures.list, storeId, specializationId])
            : qKey([apiEndpoints.procedures.list, storeId]),
        queryFn: () => getProceduresList(storeId, specializationId),
        ...options
    });
};

export const useGetProcedureByIdQuery = (id: string) => {
    return useQuery({
        queryKey: qKey([apiEndpoints.procedures.getProcedure, id]),
        queryFn: () => getProcedureById(id),
        enabled: !!id,
    });
};
