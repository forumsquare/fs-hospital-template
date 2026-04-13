import React from "react";
import CustomDialog from "./CustomDialog";
import { CustomButton, SubmitButton } from "./CustomButtons";
import { useRouter, usePathname } from "next/navigation";
import { DialogOverlay } from "../ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const AskForLogin = ({
  title,
  onCancel,
  onSubmit,
  showOverlay = true,
}: {
  title?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  showOverlay?: boolean;
}) => {
  const [open, setOpen] = React.useState(true);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const router = useRouter();
  const pathname = usePathname();
  return (
    <CustomDialog
      className="max-w-80 rounded-xl p-4 z-[1000000000000000000]"
      open={open}
      setOpen={() => {
        setOpen(false);
        onCancel?.();
      }}
      closeButton={false}
      showOverlay={isMobile ? true : false}
    >
      <h3 className="text-lg font-bold">
        {title ? title : "Login to continue with the chat"}{" "}
      </h3>
      <div className="flex items-center gap-4">
        <CustomButton
          onClick={() => {
            setOpen(false);
            onCancel?.();
          }}
        >
          Cancel
        </CustomButton>
        <SubmitButton
          onClick={() => {
            // debugger;
            console.log("click");
            router.push(`/signup?redirect=${pathname}`);
            onSubmit?.();
          }}
          className="!z-[200000000000000]"
        >
          Login
        </SubmitButton>
      </div>
    </CustomDialog>
  );
};

export default AskForLogin;
