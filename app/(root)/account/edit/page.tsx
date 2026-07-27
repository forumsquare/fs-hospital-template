"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserType } from "@/models/schema";
import { EditAccountForm } from "@/app/(root)/account/edit/components/EditAccountForm";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast, Toaster } from "sonner";
import { CustomHeader } from "@/components/custom/CustomHeader";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/serverCom";
import CustomLoading from "@/components/custom/CustomLoading";
import { useGetUserInfoQuery } from "@/services/query/userQuery";
import { useRequireAuth } from "@/hooks/useRequireAuth";

const EditAccount = () => {
  const { isAuthed } = useRequireAuth();
  const { data: profile, isPending } = useGetUserInfoQuery();

  return !isAuthed || isPending || !profile ? (
    <CustomLoading />
  ) : (
    <section className="min-h-screen  relative py-12 pt-16 -top-12">
      {/* Content */}
      <div className="relative max-w-2xl mx-auto px-4">
        <Card className="overflow-hidden shadow-none border-none bg-transparent">
          <CardHeader className="w-full">
            <CustomHeader title="Edit Profile" className="mx-auto !w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <EditAccountForm profile={profile!} />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EditAccount;
