import { apiEndpoints } from "@/constants/api";
import { useMutation } from "@tanstack/react-query";
import { signInWithGoogle, signInWithTemplate, verifyTemplateOtp } from "../api/auth";
import { toast } from "sonner";
import { qKey } from "@/lib/utils";

export const useSigninWithGoogleMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.auth.signInWithGoogle),
    mutationFn: async () => await signInWithGoogle(),
    onSuccess: async (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log({ error });
      //TODO: Error Handling
      toast.error(error.message ?? "Invalid Credentials");
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
    onError: (error) => {
      console.log({ error });
      //TODO: Error Handling
      toast.error(error.message ?? "Invalid Credentials");
    },
  });
};

export const useVerifyTemplateMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.auth.verifyTemplateOtp),
    mutationFn: async (data: { id: string, otp: string }) => await verifyTemplateOtp(data.id, data.otp),
    onSuccess: async (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log({ error });
      //TODO: Error Handling
      toast.error(error.message ?? "Invalid Credentials");
    },
  });
};
