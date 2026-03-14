"use client";
import React from "react";
import BookingHistory from "./components/BookingHistory";
import { CustomHeader } from "@/components/custom/CustomHeader";
import { useGetAppointmentByIdQuery } from "@/services/query/appointmentQuery";
import { useParams } from "next/navigation";
import CustomLoading from "@/components/custom/CustomLoading";

const Page = () => {
  const { bookingId } = useParams();
  const { data: appointmentInfo, isPending } = useGetAppointmentByIdQuery(
    bookingId as string
  );
  return (
    <section className="my-10 space-y-10 px-4">
      <CustomHeader
        title="Appointment Details"
        className="mx-auto w-full [&>h4]:mx-auto "
      />
      {isPending || !appointmentInfo ? (
        <CustomLoading />
      ) : (
        <BookingHistory booking={appointmentInfo} />
      )}
    </section>
  );
};

export default Page;
