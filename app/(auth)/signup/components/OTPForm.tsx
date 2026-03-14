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
import { useVerifyTemplateMutation } from "@/services/query/authQuery";

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
  const { setShowOTP, phoneNumber } = useAuthStore((state) => state);
  const { mutateAsync: verifyTemplateOtp, isPending } = useVerifyTemplateMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const router = useRouter();

  const onSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    await verifyTemplateOtp({ phoneNo: phoneNumber, otp: data.pin });
    router.replace("/");
  }, [verifyTemplateOtp, phoneNumber, router]);

  const [timeLeft, setTimeLeft] = useState(0);
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

  const handleResendOTP = () => {
    // Add your resend OTP logic here
    form.setValue("pin", "");
    setTimeLeft(1);
    setCanResend(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-7">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="text-center w-full space-y-8 [data-input-otp-container]:">
              <FormLabel className="bg-gradient-to-r from-gray-500 to-stone-400 bg-clip-text text-transparent text-4xl font-extrabold">
                Verification Code
              </FormLabel>
              <FormDescription className="my-5 leading-5">
                <span className="text-sm">
                  {" "}
                  we have sent a verification code to the{" "}
                </span>
                <br />
                <span className="font-extrabold tracking-wide  text-black mt-1 text-md">
                  +91 {phoneNumber}
                </span>
              </FormDescription>
              <FormControl className="mx-auto w-fit">
                <InputOTP maxLength={6} {...field} className="!mx-auto w-fit">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPGroup
                      key={index}
                      className=" w-14 h-14 backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/20 rounded-xl"
                    >
                      <InputOTPSlot
                        index={index}
                        className=" rounded-xl  text-center w-full h-full"
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
              onClick={handleResendOTP}
              className="text-blue-400 hover:text-blue-500 shadow-none hover:bg-transparent
              "
            >
              Resend OTP
            </Button>
          ) : (
            <p className="text-sm text-gray-400">
              Resend OTP in {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </p>
          )}
        </div>
        <div className="flex gap-4 max-w-md">
          <Button
            type="reset"
            variant={"outline"}
            className="rounded-3xl flex-1 font-bold bg-black/30 backdrop-blur-lg py-[20px] border-white/10"
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
