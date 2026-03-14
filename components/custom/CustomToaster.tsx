import React from "react";
import { Toaster } from "sonner";

const CustomToaster = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
        // classNames: {
        //   success: "bg-green-500  text-white",
        //   error: "bg-red-500 text-white",
        //   warning: "bg-orange-500 text-white",
        // },
      }}
      dir="ltr"
      richColors={true}
      //   icons={{ success: "✅", error: "❌" }}
    />
  );
};

export default CustomToaster;
