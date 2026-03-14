"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 720px)");
  return (
    <section
      className="min-h-screen grid grid-col-1 md:grid-cols-2 h-screen items-center"
      style={{
        backgroundImage: "url('/background/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <div className="fixed top-0 left-0 h-screen w-screen backdrop-blur-sm" /> */}

      <div
        // style={{
        //   backgroundImage: "url('/background/hero-bg.jpg')",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
        className="hidden md:flex"
      />
      <div className="gap-y-7 max-w-md w-full  mx-auto p-5 min-h-screen flex flex-col  !justify-center pt-10  md:pt-24 ">
        <Image
          src="/icons/logo.png"
          alt=""
          width={100}
          height={100}
          className="w-52 h-fit mx-auto"
        />
        <div className="flex-1 h-full z-50">{children}</div>
        <div className="font-bold text-neutral-50 mx-auto flex items-center gap-2">
          Powered by{" "}
          {/* {!isMobile && (
            <span className="bg-slate-700 text-white px-2 py-1 rounded">
              FORUMSQUARE
            </span>
          )} */}
          <Image
            src="/background/logo.png"
            alt="logout"
            width={40}
            height={40}
            className="text-black  "
          />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
