"use client";

import AuthPage from "./components/AuthPage";
import OTPForm from "./components/OTPForm";
import useAuthStore from "@/stores/auth";

import { Suspense } from "react";

const SignupPageContent = () => {
  const { showOTP } = useAuthStore((state) => state);
  return <>{showOTP ? <OTPForm /> : <AuthPage />}</>;
};

const SignupPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupPageContent />
    </Suspense>
  );
};

export default SignupPage;
