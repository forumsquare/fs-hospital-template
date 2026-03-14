import { apiEndpoints, StatusCode } from "@/constants/api";
import { storeId } from "@/constants/constant";
import { apiInstance, handleErr } from "@/lib/utils";
import { ProcedureType } from "@/models/schema";
import { APISnapshotType } from "@/models/types";

export const getProceduresList = async (
    specializationId?: string
): Promise<ProcedureType[]> => {
    try {
        const url = apiEndpoints.procedures.list.replace(":storeId", storeId);
        const response = await apiInstance.get<APISnapshotType>(
            specializationId ? `${url}?specialization=${specializationId}` : url
        );
        if (response.data.status === StatusCode.OK) {
            return response.data.data;
        }
        throw response.data.message;
    } catch (error) {
        throw handleErr(error);
    }
};

export const getProcedureById = async (
    procedureId: string
): Promise<ProcedureType> => {
    try {
        const response = await apiInstance.get<APISnapshotType>(
            apiEndpoints.procedures.getProcedure.replace(":procedureId", procedureId)
        );
        if (response.data.status === StatusCode.OK) {
            return response.data.data;
        }
        throw response.data.message;
    } catch (error) {
        throw handleErr(error);
    }
};
