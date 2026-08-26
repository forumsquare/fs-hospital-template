"use client";
import React, { useEffect, useState } from "react";
import TimingsInfo from "./TimingsInfo";
import PatientInfoForm from "./PatientInfoForm";
import { useBookingStore } from "@/stores/booking";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, XIcon } from "lucide-react";
import CustomDialog from "@/components/custom/CustomDialog";
import { CustomButton, SubmitButton } from "@/components/custom/CustomButtons";
import DetailsConfirmation from "./DetailsConfirmation";

const Booking = ({ className }: { className?: string }) => {
  const { index } = useBookingStore();
  const getComponent = () => {
    switch (index) {
      case 0:
        return <TimingsInfo />;
      case 1:
        return <PatientInfoForm />;
      default:
        return <DetailsConfirmation />;
    }
  };
  return (
    <section
      className={cn(
        " bg-white lg:rounded-3xl w-full px-6 py-8 lg:py-10   overflow-scroll border lg:relative ",
        className
      )}
    // style={{ height: `calc(100vh - 80px)` }}
    >
      {getComponent()}
    </section>
  );
};

const BookingModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const { reset, index, bookingTime } = useBookingStore();

  const handleClose = () => {
    if (bookingTime) {
      setConfirmDialog(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      setConfirmDialog(true);
    };

    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isOpen, isMobile]);

  return (
    <>
      <CustomDialog
        className="z-[100000] w-[90%] rounded-xl max-w-[500px] "
        open={confirmDialog}
        setOpen={setConfirmDialog}
        closeButton={false}
      >
        <div>
          All the saved details will be removed. Are you sure?
          <div className="flex justify-end gap-2 mt-4">
            <CustomButton onClick={() => setConfirmDialog(false)}>
              Cancel
            </CustomButton>
            <SubmitButton
              onClick={() => {
                reset();
                setIsOpen(false);
                setConfirmDialog(false);
              }}
            >
              Confirm
            </SubmitButton>
          </div>
        </div>
      </CustomDialog>
      {isMobile ? (
        <>
          <div className="fixed bottom-0 left-0  w-full h-[70px] z-[100000] flex justify-center items-center px-4 backdrop-blur-sm ">
            {/* <div className="flex flex-col  items-start">
          <div className="text-sm font-medium">Get Appointment At</div>
          <div className="text-lg font-bold text-green-700">
            {formatAmount(900)} <span className="text-sm">Only</span>
          </div>
        </div> */}
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-green-500 rounded-full text-base font-bold py-4 shadow-2xl hover:bg-green-400 transition-all duration-300 w-full"
            >
              See available slots
              <ChevronRightIcon className=" h-4 animate-bounce-x font-bold" />
            </Button>
          </div>
          {isOpen && (
            <>
              <Booking className="fixed !top-0 left-0 !w-screen !h-full z-[100000] " />
              <button
                onClick={handleClose}
                className="fixed top-4 right-4 z-[10000000000]"
              >
                <XIcon className="text-primary text-2xl" />
              </button>
            </>
          )}
        </>
      ) : (
        <Booking className="max-w-[450px] mr-auto !h-full" />
      )}
    </>
  );
};

export default BookingModal;
