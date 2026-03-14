import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "../api/testimonials";
import { qKey } from "@/lib/utils";
import { apiEndpoints } from "@/constants/api";

export const useTestimonialsQuery = ({ page, limit }: { page: number, limit: number }) => {
    return useQuery({
        queryKey: qKey(apiEndpoints.testimonials.list),
        queryFn: () => getTestimonials({ page, limit }),
    })
}