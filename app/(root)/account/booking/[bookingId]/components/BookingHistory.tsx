"use client";
import React from "react";
import BookingStatus from "./BookingStatus";
import DoctorInfo from "./DoctorInfo";
import AppointmentTime from "./AppointmentTime";
import PaymentInfo from "./PaymentInfo";
import ActionButtons from "./ActionButtons";
import HospitalInfo from "./HospitalInfo";
import { AppointmentType, HospitalInfoType } from "@/models/schema";
import PatientInfo from "./PatientInfo";
import { slotType } from "@/lib/enum";

const BookingHistory: React.FC<{ booking: AppointmentType }> = ({
  booking,
}) => {
  // console.log(booking.hospitalInfo);
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <BookingStatus
          status={booking.status}
          createdOn={booking.createdAt}
          id={booking.bookingId}
        />

        <div className="p-6 space-y-6">
          <DoctorInfo {...booking.consultant} />
          <HospitalInfo {...booking.store} />
          <AppointmentTime
            slotDay={booking.date}
            slotTime={`2000-01-01T${booking.from}Z`}
            consultationFee={booking.totalAmt}
            amount={booking.amount}
          />

          {/* <PaymentInfo
            fee={booking.fee}
            paymentStatus={booking.paymentStatus}
            referenceNo={booking.referenceNo}
          /> */}
          <PatientInfo userInfo={booking} />
        </div>

        <div className="px-3 sm:px-6 py-4 border-t border-gray-100">
          <ActionButtons
            storeId={booking.store.id}
            bookingId={booking.id}
            showRating={booking.status === slotType.CLOSED && !booking.reviewId}
            showComplaint={true}
            showCancel={
              booking.status !== slotType.CLOSED &&
              booking.status !== slotType.CANCELLED
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
