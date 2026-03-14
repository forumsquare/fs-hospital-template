import { apiEndpoints, StatusCode } from "@/constants/api";
import { storeId } from "@/constants/constant";
import { apiInstance, handleErr } from "@/lib/utils";
import { FacilityType } from "@/models/schema";
import { APISnapshotType } from "@/models/types";

export const getFacilitiesList = async (
    specializationId?: string
): Promise<FacilityType[]> => {
    try {
        const url = apiEndpoints.facilities.list.replace(":storeId", storeId);
        const response = await apiInstance.get<APISnapshotType>(
            specializationId ? `${url}?specialization=${specializationId}` : url
        );
        if (response.data.status === StatusCode.OK) {
            return (response.data.data as any[]).map((facility) => ({
                ...facility,
                image: facility.images?.[0] || "",
            }));
        }
        throw response.data.message;
    } catch (error) {
        throw handleErr(error);
    }
};
