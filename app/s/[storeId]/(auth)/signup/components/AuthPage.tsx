import React from "react";
import MobileComponent from "./Mobile";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSigninWithGoogleMutation } from "@/services/query/authQuery";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const AuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { mutateAsync: signIn, isPending } = useSigninWithGoogleMutation();
  return (
    <section className="gap-y-12 flex flex-col h-fit">
      <div className="gap-y-7 flex-1 flex flex-col ">
        <div className="space-y-1 my-5 text-center">
          <h4 className="font-bold text-4xl ">Welcome to Episkin </h4>
          <p className="text-black/50 font-semibold text-sm">
            Log in to book appointments, view your visit details, and more — all
            at your fingertips.
          </p>
        </div>
        <MobileComponent />
        <div className="flex items-center gap-x-4 max-w-sm mx-auto">
          <hr className="bg-gradient-to-r from-transparent to-gray-500 h-[4px]  rounded-full w-[120px] " />
          <span className="whitespace-nowrap text-sm text-black font-semibold">
            or
          </span>
          <hr className="bg-gradient-to-r from-gray-500 to-transparent h-[4px]  rounded-full w-[120px]" />
        </div>
        <Button
          className="rounded-full w-full max-w-sm mx-auto py-[22px] font-bold bg-gradient-to-r from-neutral-100 to-stone-200 text-lg  "
          variant={"outline"}
          onClick={async () => {
            await signIn();
            router.push(redirect);
          }}
          disabled={isPending}
        >
          <Image
            src={"/icons/google.svg"}
            alt="google"
            width={24}
            height={24}
            className="filter invert"
          />
          <p className="w-full flex-1 text-center text-black">
            Continue with Google
          </p>
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </div>
      <p className=" text-center max-w-md text-wrap text-sm text-black font-bold leading-5">
        <span className=""> By creating an account, you agree to the </span>
        <br />
        <a
          href={"https://www.forumsquare.in/terms-and-conditions"}
          target="_blank"
          className="text-green-700 font-bold mr-[2px]"
        >
          Terms & Conditions and Privacy Policy
        </a>
        .
      </p>
      
    </section>
  );
};

export default AuthPage;
