"use client";

import AuthPage from "./components/AuthPage";
import OTPForm from "./components/OTPForm";
import useAuthStore from "@/stores/auth";

const SignupPage = () => {
  const { showOTP } = useAuthStore((state) => state);
  return <>{showOTP ? <OTPForm /> : <AuthPage />}</>;
};

export default SignupPage;
