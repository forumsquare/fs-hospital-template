import React from "react";
import Image from "next/image";
import { FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useUploadMutation } from "@/services/query/uploadQuery";
import { toast } from "sonner";

interface ProfileImageUploadProps {
  firstName?: string;
  lastName?: string;
  onImageChange: (file: File) => void;
  className?: string;
  image: string;
}

export function ProfileImageUpload({
  firstName,
  lastName,
  onImageChange,
  className,
  image,
}: ProfileImageUploadProps) {
  const { mutateAsync, isPending: isPendingUpload } = useUploadMutation();
  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <label
        className="group relative rounded-full w-32 h-32 flex items-center justify-center 
          bg-secondary/50 hover:bg-secondary/70 transition-all border-2 border-border 
          cursor-pointer overflow-hidden"
        htmlFor="profileImage"
      >
        <Image
          src={(image as string) || "/icons/account.svg"}
          alt="account"
          width={1000}
          height={1000}
          className="text-primary transition-transform group-hover:scale-110 size-full"
        />
        <div
          className="absolute inset-0 bg-black/40 flex items-center justify-center 
          opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <span className="text-white text-sm font-medium">Change Photo</span>
        </div>
      </label>
      <FormControl>
        <input
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const url = await mutateAsync(file);
            onImageChange(url);
            toast.success("Profile Image Updated");
          }}
          className="hidden"
          type="file"
          id="profileImage"
          accept="image/*"
          name="profileImage"
        />
      </FormControl>
    </div>
  );
}
