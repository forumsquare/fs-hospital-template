import { apiEndpoints } from "@/constants/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInfo, updateUser } from "../api/user";
import { UserType } from "@/models/schema";
import { qKey } from "@/lib/utils";
import { toast } from "sonner";

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.user.update),
    mutationFn: (data: UserType) => updateUser(data),
    onSuccess: () => {
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update profile. Please try again.", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    },
  });
};

export const useGetUserInfoQuery = () => {
  return useQuery({
    queryKey: qKey(apiEndpoints.user.update),
    queryFn: () => getUserInfo(),
  });
};
