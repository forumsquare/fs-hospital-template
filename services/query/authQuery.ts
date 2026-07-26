import { apiEndpoints } from "@/constants/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithGoogle, signInWithTemplate, verifyTemplateOtp } from "../api/auth";
import { toast } from "sonner";
import { qKey } from "@/lib/utils";
import { SESSION_QUERY_KEY } from "@/hooks/useSession";

export const useSigninWithGoogleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: qKey(apiEndpoints.auth.signInWithGoogle),
    mutationFn: async () => await signInWithGoogle(),
    onSuccess: async (data) => {
      // Sign-in navigates client-side rather than reloading, so the cached
      // session has to be refreshed or every auth-gated query stays disabled.
      await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
      console.log({ data });
    },
    onError: (error: any) => {
      console.log("Detailed Error:", error);
      const message = error?.message || (error?.code === "ERR_NETWORK" ? "Network Error: Unable to reach server" : "Login Failed: Please check your connection");
      toast.error(message);
    },
  });
};

export const useSignInWithTemplateMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.auth.templateSignin),
    mutationFn: async (phoneNo: string) => await signInWithTemplate(phoneNo),
    onSuccess: async (data) => {
      console.log({ data });
    },
    onError: (error: any) => {
      console.log("Detailed Error:", error);
      const message = error?.message || (error?.code === "ERR_NETWORK" ? "Network Error: Unable to reach server" : "Sign-in Failed: Please check your connection");
      toast.error(message);
    },
  });
};

export const useVerifyTemplateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: qKey(apiEndpoints.auth.verifyTemplateOtp),
    mutationFn: async (data: { id: string, otp: string }) => await verifyTemplateOtp(data.id, data.otp),
    onSuccess: async (data) => {
      // OTP verification is the other path that establishes a session.
      await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
      console.log({ data });
    },
    onError: (error: any) => {
      console.log("Detailed Error:", error);
      const message = error?.message || (error?.code === "ERR_NETWORK" ? "Network Error: Unable to reach server" : "Verification Failed: Please check your connection");
      toast.error(message);
    },
  });
};
