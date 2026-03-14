"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBookingHistory } from "@/stores/bookings";
import { toast, Toaster } from "sonner";
import ActionButtons from "./[bookingId]/components/ActionButtons";
import AppointmentTime from "./[bookingId]/components/AppointmentTime";
import PaymentInfo from "./[bookingId]/components/PaymentInfo";
import ContactInfo from "./[bookingId]/components/ContactInfo";
import { useRouter } from "next/navigation";
import { CustomHeader } from "@/components/custom/CustomHeader";
import { useGetAppointmentsQuery } from "@/services/query/appointmentQuery";
import CustomLoading from "@/components/custom/CustomLoading";
import { slotType } from "@/lib/enum";
import NoDataPage from "@/components/custom/NoDataPage";

const BookingPage = () => {
  const router = useRouter();
  // const { bookingHistory, cancelAppointment } = useBookingHistory();

  const { data, isPending } = useGetAppointmentsQuery({ page: 1, limit: 10 });

  const getStatusColor = (status: slotType) => {
    const colors = {
      [slotType.PENDING]: "bg-yellow-500",
      [slotType.BOOKED]: "bg-green-500",
      consulted: "bg-blue-500",
      [slotType.REJECTED]: "bg-red-500",
    };
    return status ? colors[status as keyof typeof colors] : "bg-gray-500";
  };

  return (
    <div className="  mx-auto p-4 mt-3 md:mt-9 items-center md:flex md:flex-col md:items-center">
      <CustomHeader title="My Appointments" />

      {isPending ? (
        <CustomLoading />
      ) : !data ? (
        <NoDataPage />
      ) : (
        <div className=" flex flex-col gap-5 items-center flex-wrap overflow-y-auto  ">
          {data?.map((appointment) => (
            <Card
              key={appointment.id}
              className="shadow-lg w-full sm:w-[450px] md:w-[550px]"
            >
              <div
                className="cursor-pointer"
                onClick={() =>
                  router.push(`/account/booking/${appointment.id}`)
                }
              >
                <CardHeader>
                  <div className="flex justify-between flex-col gap-2 sm:flex-row items-start cursor-pointer">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {appointment.storeName}
                      </h2>
                      <p className="text-gray-600">
                        {appointment.consultantName}
                      </p>
                    </div>
                    <Badge
                      className={getStatusColor(appointment.status as slotType)}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="px-2">
                  <AppointmentTime
                    slotDay={appointment.date}
                    slotTime={`2000-01-01T${appointment.from}Z`}
                  />
                  <ContactInfo
                    contactDetails={appointment}
                    showHeading={false}
                  />
                  <PaymentInfo
                    fee={parseInt(appointment.amount)}
                    discounted={parseInt(appointment.totalAmt)}
                    showHeading={false}
                  />
                </CardContent>
              </div>
              <CardFooter className="flex flex-col gap-3 px-2">
                <ActionButtons
                  storeId={appointment.storeId}
                  bookingId={appointment.id}
                  showRating={
                    appointment.status === slotType.CLOSED &&
                    !appointment.reviewId
                  }
                  showComplaint={true}
                  showCancel={
                    appointment.status !== slotType.CLOSED &&
                    appointment.status !== slotType.CANCELLED
                  }
                  // onCancel={() => handleCancelAppointment(appointment.id)}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPage;
