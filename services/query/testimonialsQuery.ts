import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "../api/testimonials";
import { qKey } from "@/lib/utils";
import { apiEndpoints } from "@/constants/api";
import { useStoreId } from "@/components/providers/StoreProvider";

export const useTestimonialsQuery = ({ page, limit }: { page: number, limit: number }) => {
    const storeId = useStoreId();
    return useQuery({
        queryKey: qKey([apiEndpoints.testimonials.list, storeId, String(page), String(limit)]),
        queryFn: () => getTestimonials({ storeId, page, limit }),
    })
}