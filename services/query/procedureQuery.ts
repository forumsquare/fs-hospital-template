import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getProcedureById, getProceduresList } from "../api/procedure";

export const useGetProceduresListQuery = (specializationId?: string, options?: { initialData?: any }) => {
    return useQuery({
        queryKey: specializationId
            ? qKey([apiEndpoints.procedures.list, specializationId])
            : qKey(apiEndpoints.procedures.list),
        queryFn: () => getProceduresList(specializationId),
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
