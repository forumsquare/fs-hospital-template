import React, { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { UserSchema, UserType } from "@/models/schema";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { InputIcon } from "@/components/custom/ServerComponents";
import CustomInput from "@/components/custom/CustomInput";
import { ProfileImageUpload } from "./ProfileImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import CustomTextField from "@/components/custom/CustomTextField";
import { CustomSelect } from "@/components/custom/CustomSelect";
import { CustomButton, SubmitButton } from "@/components/custom/CustomButtons";
import CustomDatePicker from "@/components/custom/CustomDatePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AuthType, Gender } from "@/lib/enum";
import { useUpdateUserMutation } from "@/services/query/userQuery";
import { Loader2 } from "lucide-react";

interface EditAccountFormProps {
  profile: UserType;
}

export function EditAccountForm({ profile }: EditAccountFormProps) {
  const router = useRouter();
  const { mutateAsync: update, isPending } = useUpdateUserMutation();
  const form = useForm<UserType>({
    resolver: zodResolver(UserSchema),
    defaultValues: { ...profile },
  });

  const handleSubmit = async (values: UserType) => {
    try {
      // Your form submission logic here
      await update(values);
      router.back();
    } catch (error) {}
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
        <ProfileImageUpload
          image={form.getValues("image") as string}
          onImageChange={(file) => {
            console.log({ file });
            form.setValue("image", file, { shouldValidate: true });
          }}
        />
        {/* <div
          className="group relative rounded-full w-32 h-32 flex items-center justify-center 
          bg-white border-2 border-border 
          overflow-hidden mx-auto"
        >
          <Image
            src={(profile.image as string) || "/icons/account.svg"}
            alt="account"
            width={500}
            height={500}
            className="text-primary transition-transform size-full "
          />
        </div> */}
        <div className="grid gap-6 sm:grid-cols-2">
          <CustomTextField
            control={form.control}
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            leading={<InputIcon src="/icons/account.svg" alt="account" />}
          />
          <CustomTextField
            control={form.control}
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            leading={<InputIcon src="/icons/account.svg" alt="account" />}
          />
          <CustomTextField
            control={form.control}
            label="Email"
            name="email"
            placeholder="Enter your email"
            leading={<InputIcon src="/icons/email.svg" alt="email" />}
            disabled={profile.authType === AuthType.EMAIL}
            className="sm:col-span-2"
          />
          <CustomTextField
            control={form.control}
            label="Phone Number"
            name="phone"
            placeholder="Enter your mobile number"
            leading={<InputIcon src="/icons/phone.svg" alt="mobile" />}
            disabled={profile.authType === AuthType.PHONE}
            className="sm:col-span-2"
          />

          <CustomDatePicker
            control={form.control}
            label="Date of Birth"
            name="dob"
            placeholder="Select date of birth"
            className="sm:col-span-2"
          />

          <CustomSelect
            control={form.control}
            label="Gender"
            name="gender"
            items={[
              { value: Gender.MALE, label: "Male" },
              { value: Gender.FEMALE, label: "Female" },
            ]}
            placeholder="Select gender"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <CustomButton type="button" className="sm:p-2" onClick={onCancel}>
            Cancel
          </CustomButton>
          <SubmitButton disabled={isPending}>
            Save Changes {isPending && <Loader2 className="animate-spin" />}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
