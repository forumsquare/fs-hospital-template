import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { uploadBlog } from "../api/blog-upload";

export const useUploadMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.base.blob),
    mutationFn: (file: any) => uploadBlog(file),
  });
};
