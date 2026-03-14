"use client";

import { cn } from "@/lib/utils";
import { UserType } from "@/models/schema";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ProfileCardProps {
  profile: UserType;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        onClick={() => router.push("/account/edit")}
        className={cn(
          "w-full cursor-pointer group relative overflow-hidden",
          "bg-white/50 dark:bg-gray-900",
          "border border-violet-100 dark:border-violet-900/50",
          "hover:border-violet-200 dark:hover:border-violet-800",
          "transition-all duration-500 flex justify-between items-center"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div>
          <CardHeader className="p-4">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-20 h-20 rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 animate-gradient" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </div>
              </motion.div>
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                    {profile.firstName} {profile.lastName}
                  </span>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {profile.email}
                </CardDescription>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  +91 {profile.phone}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </div>

      </Card>
    </motion.div>
  );
};
