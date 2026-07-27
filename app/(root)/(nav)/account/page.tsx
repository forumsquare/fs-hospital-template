"use client";

import React, { useEffect } from "react";
import { Bell, ShoppingBag, LogOut, ReceiptText } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProfileCard } from "../../account/components/UserNavItem";
import { UserNavItem } from "../../account/components/UserNav";
import CustomLoading from "@/components/custom/CustomLoading";
import { useGetUserInfoQuery } from "@/services/query/userQuery";
import { useSession } from "@/hooks/useSession";

const navigationItems = [
  {
    icon: ShoppingBag,
    title: "Recent Bookings",
    href: "/account/booking",
    gradient: "from-blue-500 to-cyan-400",
    shadowColor: "shadow-blue-500/20",
  },
  // {
  //   icon: Bell,
  //   title: "Notifications",
  //   href: "/account/notifications",
  //   gradient: "from-violet-500 to-purple-400",
  //   shadowColor: "shadow-violet-500/20",
  // },
  {
    icon: ReceiptText,
    title: "Terms & Conditions",
    href: "/account/terms&conditions",
    gradient: "from-yellow-500 to-orange-400",
    shadowColor: "shadow-orange-500/20",
  },
  {
    icon: LogOut,
    title: "Logout",
    href: "/signup",
    gradient: "from-red-500 to-orange-400",
    shadowColor: "shadow-red-500/20",
  },
];

const AccountPage = () => {
  const router = useRouter();
  const { isLoggedIn, isSessionLoading } = useSession();
  const { data: profile, isPending } = useGetUserInfoQuery();

  // The profile query is disabled while logged out, which leaves it in the
  // `pending` state forever. Without this the page just spins with nothing to
  // show, so send logged-out visitors to the login screen instead.
  useEffect(() => {
    if (!isSessionLoading && !isLoggedIn) {
      router.replace("/signup?redirect=/account");
    }
  }, [isSessionLoading, isLoggedIn, router]);

  // Loader while: resolving the session, redirecting a logged-out user, or
  // fetching the profile for a logged-in user.
  if (isSessionLoading || !isLoggedIn || isPending || !profile) {
    return <CustomLoading />;
  }

  return (
    <section className="sm:min-h-[calc(100vh-49px)]  pt-16 pb-10 sm:pb-0">
      <section className="relative max-w-screen-md mx-auto p-4 space-y-6 pt-8">
        <ProfileCard profile={profile!} />

        <div className="space-y-3">
          {navigationItems.map((item, index) => (
            <UserNavItem
              key={item.title}
              Icon={item.icon}
              title={item.title}
              href={item.href}
              gradient={item.gradient}
              shadowColor={item.shadowColor}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default AccountPage;
