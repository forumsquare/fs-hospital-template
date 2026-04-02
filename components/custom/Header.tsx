import MobileSideBar from "./MobileSideBar";
import Image from "next/image";
import { motion } from "framer-motion";
// import { navList } from "@/constants/list";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Badge } from "../ui/badge";
import { useGetUnreadCountQuery } from "@/services/query/notificationsQuery";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { NavType } from "@/models/types";
import { getCookie } from "@/lib/serverCom";

const HeaderSection = ({ logo, name }: { logo: string, name: string }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const pathname = usePathname();

  const { data } = useGetUnreadCountQuery(!!user);

  const navList: NavType[] = [
    { href: "/", title: "Home" },
    { href: "/#doctors", title: "Doctors" },
    { href: "/specializations", title: "Specializations" },
    // { href: "/diagnostics", title: "Diagnostics" },
    !!user
      ? { href: "/account", title: "Account" }
      : { href: "/signup", title: "Signup" },
    { href: "/account/notifications", title: "Notifications" },
  ];

  useEffect(() => {
    (async () => {
      const userInfo = await getCookie("userInfo");
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
      setLoading(false);
    })();
  }, []);
  // console.log({ data, isLoggedIn }, "notifications");

  return (
    <>
      <div className="lg:hidden fixed top-0 h-16 flex items-center p-5  backdrop-blur-md w-full z-[999999]">
        <MobileSideBar data={data} logo={logo} name={name} />
      </div>
      <header className="hidden  fixed z-[999999] top-10 right-0 left-0  flex-center  lg:flex items-center justify-center ">
        <div className="fixed w-[41rem]  h-[3.5rem] left-1/2  -translate-x-1/2 rounded-full backdrop-blur-lg bg-white/40  border-black/[0.08] border"></div>
        <nav className="flex fixed items-center  ">
          <ul className="flex !w-[41rem]  items-center justify-around px-4 gap-y-1 flex-nowrap  gap-x-6  ">
            <Image
              src={logo}
              alt={name}
              width={150}
              height={50}
              className="h-[50px] w-[150px] object-contain object-center "
            />
            {navList.map(({ title, href }) =>
              title === "Notifications" && !!user ? null : (
                <motion.li
                  key={href}
                  className="h-3/4 flex items-center justify-center relative"
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <Link
                    href={href}
                    className={cn([
                      "whitespace-nowrap font-semibold  transition-all duration-700 flex items-center justify-center  text-sm  text-neutral-800 hover:text-neutral-400",
                      pathname === href &&
                      "text-white font-bold text-sm  px-4 py-1.5",
                      title === "Notifications" && "px-2 relative",
                    ])}
                  >
                    {title === "Notifications" && !!data && (
                      <Badge
                        variant={"destructive"}
                        className="absolute -top-2 -right-1 h-4 !w-4 p-0 flex justify-center items-center"
                      >
                        {data}
                      </Badge>
                    )}
                    <span>{title}</span>

                    {pathname === href && (
                      <motion.span
                        className={cn([
                          "bg-neutral-700  backdrop-blur-xl rounded-full  absolute inset-0 -z-10 ",
                        ])}
                        layoutId="activeId"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      ></motion.span>
                    )}
                  </Link>
                </motion.li>
              )
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default HeaderSection;
