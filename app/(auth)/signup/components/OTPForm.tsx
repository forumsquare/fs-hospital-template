"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import useAuthStore from "@/stores/auth";
import { useVerifyTemplateMutation, useSignInWithTemplateMutation } from "@/services/query/authQuery";

const FormSchema = z.object({
  pin: z
    .string()
    .min(6, {
      message: "Your one-time password must be 6 characters.",
    })
    .regex(/^\d+$/, {
      message: "Please enter numbers only.",
    }),
});

const OTPForm = () => {
  const { setShowOTP, phoneNumber, otpId, setOtpId } = useAuthStore((state) => state);
  const { mutateAsync: verifyTemplateOtp, isPending } = useVerifyTemplateMutation();
  const { mutateAsync: resendOtp, isPending: isResending } = useSignInWithTemplateMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const router = useRouter();

  const onSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    await verifyTemplateOtp({ id: otpId, otp: data.pin });
    router.replace("/");
  }, [verifyTemplateOtp, otpId, router]);

  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const pin = form.watch("pin");

  useEffect(() => {
    if (pin.length === 6) {
      form.handleSubmit(onSubmit)();
    }
  }, [pin, form, onSubmit]);

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResendOTP = async () => {
    try {
      const response = await resendOtp(phoneNumber);
      if (response.data?.id) {
        setOtpId(response.data.id);
      }
      form.setValue("pin", "");
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      console.error("Error resending OTP", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-7">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="text-center w-full space-y-8 [data-input-otp-container]:">
              <FormLabel className="text-black drop-shadow-md text-4xl font-extrabold">
                Verification Code
              </FormLabel>
              <FormDescription className="my-5 leading-5">
                <span className="text-sm text-white/80 font-medium">
                  {" "}
                  We have sent a verification code to{" "}
                </span>
                <br />
                <span className="font-extrabold tracking-wide text-white drop-shadow-sm mt-1 text-md">
                  +91 {phoneNumber}
                </span>
              </FormDescription>
              <FormControl className="mx-auto w-fit">
                <InputOTP maxLength={6} {...field} className="!mx-auto w-fit">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPGroup
                      key={index}
                      className="w-14 h-14 backdrop-blur-xl border border-white/30 bg-white/20 rounded-xl shadow-inner transition-colors focus-within:bg-white/30 focus-within:border-white/60"
                    >
                      <InputOTPSlot
                        index={index}
                        className="rounded-xl text-center w-full h-full text-white font-bold text-2xl "
                      />
                    </InputOTPGroup>
                  ))}
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center">
          {canResend ? (
            <Button
              type="button"
              variant="ghost"
              disabled={isResending}
              onClick={handleResendOTP}
              className="text-white font-bold underline hover:text-white/80 shadow-none hover:bg-transparent"
            >
              Resend OTP
            </Button>
          ) : (
            <p className="text-sm text-white/80 font-medium">
              Resend OTP in {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </p>
          )}
        </div>
        <div className="flex gap-4 max-w-md">
          <Button
            type="reset"
            variant={"outline"}
            className="rounded-3xl flex-1 font-bold text-white bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-lg py-[20px] border-white/20 shadow-lg"
            onClick={() => setShowOTP(false)}
          >
            Back
          </Button>
          <Button type="submit" className="rounded-3xl flex-1 font-bold">
            <span className="w-full flex-1">Continue</span>
            <Image
              src="/icons/arrow.svg"
              alt=""
              width={16}
              height={16}
              className="filter invert"
            />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OTPForm;
