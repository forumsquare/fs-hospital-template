import { Form } from "@/components/ui/form";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import CustomInput from "@/components/custom/CustomInput";
import useAuthStore from "@/stores/auth";
import { useSignInWithTemplateMutation } from "@/services/query/authQuery";

const MobileComponent = () => {
  const { setShowOTP, setPhoneNumber, setOtpId } = useAuthStore((state) => state);
  const { mutateAsync: signInWithTemplate } = useSignInWithTemplateMutation();
  const formSchema = z.object({
    mobileNo: z
      .string()
      .length(10, { message: "Enter 10 digit mobile number" })
      .regex(/^[0-9]{10}$/, { message: "Only numbers are allowed" }),
  });

  type MobileType = z.infer<typeof formSchema>;

  const form = useForm<MobileType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobileNo: "",
    },
  });

  const onSubmit = async (val: MobileType) => {
    console.log(val);
    const response = await signInWithTemplate(val.mobileNo);
    console.log({ response });
    if (response.data?.id) {
      setOtpId(response.data.id);
      setPhoneNumber(val.mobileNo);
      setShowOTP(true);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomInput
          control={form.control}
          label="Mobile Number"
          labelClassName="text-base"
          name="mobileNo"
          placeholder="Enter mobile number"
          className="text-black !text-base"
          leading={<span className="text-black font-bold mr-1">+91</span>}
          trailing={
            <button
              type="submit"
              className="rounded-full p-2  bg-gradient-to-b from-neutral-200 to-neutral-400 "
            // onClick={() => {
            //   form.handleSubmit(onSubmit)();
            // }}
            >
              <Image
                src="/icons/arrow.svg"
                alt="submit"
                width={16}
                height={16}
                className="rounded-full filter invert"
              />
            </button>
          }
        />
      </form>
    </Form>
  );
};

export default MobileComponent;
