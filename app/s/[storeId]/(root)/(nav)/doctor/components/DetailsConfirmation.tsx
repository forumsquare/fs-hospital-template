import { useBookingStore } from "@/stores/booking";
import React from "react";
import { BookingInfo } from "./BookingInfo";
import { CustomButton, SubmitButton } from "@/components/custom/CustomButtons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useBookSlotMutation } from "@/services/query/appointmentQuery";
import { address_id } from "@/constants/constant";
import CustomLoading from "@/components/custom/CustomLoading";
import { Loader2 } from "lucide-react";

const DetailsConfirmation = () => {
  const { setIndex, reset, doctorInfo, bookingDate, bookingTime, patientInfo, bookingAddress } =
    useBookingStore();
  const router = useRouter();

  const { mutateAsync: bookSlot, isPending } = useBookSlotMutation();
  const onConfirm = async () => {
    if (
      !doctorInfo?.id ||
      !bookingDate ||
      !bookingTime ||
      !patientInfo?.name ||
      !patientInfo?.phone ||
      !patientInfo?.gender ||
      !patientInfo?.age
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    // TODO: Send booking details to API
    console.log("hiii");
    const data = await bookSlot({
      consultantId: doctorInfo?.id,
      date: bookingDate.toISOString(),
      time: bookingTime?.toISOString(),
      addressId: bookingAddress?.id || address_id,
      age: patientInfo?.age,
      name: patientInfo?.name,
      phoneNo: patientInfo?.phone,
      email: patientInfo?.email || undefined,
      gender: patientInfo?.gender,
      amount: doctorInfo?.fee,
      storeId: doctorInfo?.storeId,
      discountAmt: doctorInfo?.discountAmt,
      tax: "0",
      totalAmt: "0",
      comments: patientInfo?.comment,
      slotDuration: doctorInfo?.slotDuration,
    });
    reset();
    // console.log({ data });
    router.push(`/account/booking/${data.data}`);
  };
  return (
    <div className="flex flex-col py-10 lg:py-0 items-center space-y-8 ">
      <h2 className="text-3xl font-bold text-center">Booking Details</h2>
      <BookingInfo showPatientInfo={true} />
      <div className="w-full max-w-sm flex gap-3">
        <CustomButton onClick={() => setIndex(1)} className="">
          Back
        </CustomButton>
        <SubmitButton onClick={onConfirm} className="" disabled={isPending}>
          Confirm {isPending && <Loader2 className="animate-spin" />}
        </SubmitButton>
      </div>
    </div>
  );
};

export default DetailsConfirmation;
