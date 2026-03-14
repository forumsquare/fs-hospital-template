import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navList } from "@/constants/list";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, MenuIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { useGetUnreadCountQuery } from "@/services/query/notificationsQuery";
import { UserType } from "@/models/schema";
import { getCookie } from "@/lib/serverCom";
import { auth } from "@/lib/firebase";

const MobileSideBar = ({ data, logo, name }: { data: number, logo: string, name: string }) => {
  const isLoggedIn = auth.currentUser;
  const path = usePathname();
  const [profile, setProfile] = useState<UserType | null>(null);
  const [pending, setPending] = useState<boolean>(true);

  console.log("Loggedin", isLoggedIn);
  const [open, setOpen] = useState(false);

  const handleResize = () => {
    if (window.innerWidth > 1024) {
      // Adjust the width as needed
      setOpen(false);
    }
  };
  useEffect(() => {
    (async () => {
      const user = await getCookie("userInfo");
      if (user) {
        setProfile(JSON.parse(user));
      }
      setPending(false);
    })();
  }, []);

  // New function to handle clicks outside the sidebar
  const handleClickOutside = (event: MouseEvent) => {
    const sidebar = document.getElementById("mobile-sidebar"); // Add an id to the sidebar
    if (sidebar && !sidebar.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Sheet open={open}>
      <SheetTrigger onClick={() => setOpen(true)}>
        <MenuIcon className="h-6 w-6" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="z-[9999999] flex flex-col gap-y-5 p-0 border-none rounded-r-3xl max-h-screen overflow-y-auto"
        id="mobile-sidebar"
      >
        <SheetHeader className="p-5">
          <button
            className="ml-auto text-lg p-2 bg-slate-200 rounded-full font-extrabold size-7 flex items-center justify-center hover:scale-[1.2] active:scale-[0.8] duration-200 transition-all"
            onClick={() => setOpen(false)}
          >
            x
          </button>
          <SheetTitle>
            <Image
              src={logo}
              alt={name}
              width={180}
              height={180}
              className="mt-10"
            />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-5 pt-6 flex-1 ">
          {navList.map(({ title, href }) =>
            title === "Notifications" && !isLoggedIn ? null : (
              <motion.div
                key={href}
                className="flex items-center justify-start"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <Link
                  href={href}
                  className={cn([
                    "text-lg font-medium flex items-center  py-2 w-full  gap-x-2 hover:bg-gray-100 duration-200 transition-all ",
                    path === href
                      ? "text-primary bg-primary/[0.05] font-extrabold "
                      : "text-muted-foreground",
                    title === "Notifications" && " relative",
                  ])}
                  onClick={() => setOpen(false)}
                >
                  <div
                    className={cn([
                      "w-1 h-8  rounded-full",
                      path === href && "bg-primary",
                    ])}
                  />
                  <span>{title}</span>
                  {title === "Notifications" && data > 0 && (
                    <Badge
                      variant={"destructive"}
                      className="h-4 !w-4 p-0 flex justify-center items-center"
                    >
                      {data}
                    </Badge>
                  )}
                </Link>
              </motion.div>
            )
          )}
        </nav>
        <hr className="mx-6" />
        {/* <SheetFooter className="flex gap-x-3 flex-row items-center p-4 pt-2">
          <div className="bg-slate-200 rounded-full">
            <Image
              src={"/icons/account.svg"}
              alt="account"
              width={20}
              height={20}
              className="size-6 p-1"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">
              {profile?.firstName + " " + profile?.lastName}
            </p>
            <p className="text-xs text-muted-foreground no-underline">
              {profile?.email}
            </p>
          </div>
          <Image
            src={"/icons/logout.svg"}
            alt="account"
            width={20}
            height={20}
          />
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
