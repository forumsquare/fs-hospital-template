import React from "react";
import { Clock } from "lucide-react";
import { slotType } from "@/lib/enum";
import { format } from "date-fns";

interface BookingStatusProps {
  status: string;
  createdOn: string;
  id: string;
}

export default function BookingStatus({
  status,
  createdOn,
  id,
}: BookingStatusProps) {
  const statusColors = {
    [slotType.PENDING]: "bg-yellow-100 text-yellow-800",
    [slotType.BOOKED]: "bg-green-100 text-green-800",
    [slotType.CANCELLED]: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-chart-3/10 px-6 py-4 border-b border-blue-100">
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-primary">
          Appointment Details
        </h4>
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            statusColors[status as keyof typeof statusColors] ||
            "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center whitespace-nowrap gap-4 text-sm text-chart-3 font-medium">
        <span className="!break-words whitespace-normal ">
          Booking ID: {id}
        </span>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>
            Booked on {format(new Date(createdOn), "dd/MM/yyyy hh:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
}
