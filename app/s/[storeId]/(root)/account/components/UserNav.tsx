"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { removeCookie } from "@/lib/serverCom";
import { auth } from "@/lib/firebase";

interface UserNavItemProps {
  Icon: React.ElementType;
  title: string;
  href: string;
  gradient: string;
  shadowColor: string;
  delay: number;
}

export const UserNavItem = ({
  Icon,
  title,
  href,
  gradient,
  shadowColor,
  delay,
}: UserNavItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        href={href}
        onClick={async () => {
          if (title === "Logout") {
            await auth.signOut();
            await removeCookie("userInfo");
            await removeCookie("refreshToken");
            window.location.href = "/";
          }
        }}
        className={cn(
          "group flex items-center justify-between w-full rounded-xl p-4",
          "bg-white  dark:bg-gray-900  ",
          "border border-primary/15 dark:border-gray-800",
          "hover:border-gray-200 dark:hover:border-gray-700",
          "transition-all duration-300 ease-out hover:scale-[1.02]",
          shadowColor
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "p-3 rounded-xl bg-gradient-to-br",
              gradient,
              "transform transition-transform duration-300 group-hover:scale-110"
            )}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {title}
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 transform transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
};
