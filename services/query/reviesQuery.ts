import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { submitReview } from "../api/reviews";

export const useSubmitReviewMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.reviews.submit),
    mutationFn: (data: {
      type: string;
      review: string;
      reviewOn: string;
      rating: string;
      reviewdTo: string;
    }) => submitReview(data),
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: qKey(apiEndpoints.appointMents.getAppointments),
      // });
    },
  });
};
