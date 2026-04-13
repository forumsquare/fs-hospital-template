"use client";
import React, { useEffect, useState } from "react";
import BookingStatus from "./BookingStatus";
import DoctorInfo from "./DoctorInfo";
import AppointmentTime from "./AppointmentTime";
import PaymentInfo from "./PaymentInfo";
import ActionButtons from "./ActionButtons";
import HospitalInfo from "./HospitalInfo";
import { AppointmentType, HospitalInfoType } from "@/models/schema";
import PatientInfo from "./PatientInfo";
import { slotType } from "@/lib/enum";
import { getCookie } from "@/lib/serverCom";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BookingHistory: React.FC<{ booking: AppointmentType }> = ({
  booking,
}) => {
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setLoading(true)
    const fetchUser = async () => {
      const res = await getCookie("userInfo");
      if (res) {
        const user = JSON.parse(res);
        setUserId(user.id);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const pathname = usePathname();

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

        {userId ? <div className="px-3 sm:px-6 py-4 border-t border-gray-100">
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
        </div> : <div className="px-3 sm:px-6 py-4 border-t border-gray-100">
          Want to cancel the appointment? <Link className="text-blue-600 font-semibold" href={`/signup?redirect=${pathname}`}>Login</Link> to continue
        </div>}
      </div>
    </div>
  );
};

export default BookingHistory;
