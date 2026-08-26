import { apiEndpoints, StatusCode } from "@/constants/api";
import { apiInstance, handleErr } from "@/lib/utils";
import { APISnapshotType } from "@/models/types";
import { TestimonialType } from "@/models/schema";

export const getTestimonials = async ({ storeId, page, limit }: { storeId: string, page: number, limit: number }): Promise<TestimonialType[]> => {
    try {
        const response = await apiInstance.get<APISnapshotType>(
            apiEndpoints.testimonials.list.replace(":storeId", storeId)
        );
        if (response.data.status === StatusCode.OK) {
            return response.data.data;
        }
        throw response.data.message;
    } catch (error) {
        throw handleErr(error);
    }
}