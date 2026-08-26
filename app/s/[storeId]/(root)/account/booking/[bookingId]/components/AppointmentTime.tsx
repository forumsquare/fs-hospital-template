import React from "react";
import { Calendar, Clock, IndianRupee } from "lucide-react";
import { cn, formatAmount, toLocalISOString } from "@/lib/utils";
import { format } from "date-fns";

interface AppointmentTimeProps {
  slotDay: string;
  slotTime: string;
  consultationFee?: string;
  amount?: string;
}

export default function AppointmentTime({
  slotDay,
  slotTime,
  consultationFee,
  amount,
}: AppointmentTimeProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const newTime = new Date(timeString);
    newTime.setHours(newTime.getHours() - 5);
    newTime.setMinutes(newTime.getMinutes() - 30);
    return newTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={cn(
        "  grid grid-cols-1 text-sm md:grid-cols-2 gap-6 p-4 rounded-lg font-medium",
        consultationFee && "bg-white border"
      )}
    >
      <div className="flex items-center space-x-4">
        {consultationFee ? (
          <div className="bg-white p-3 rounded-full ">
            <Calendar className="h-5 w-5  text-chart-2" />
          </div>
        ) : (
          <Calendar className="h-5 w-5 text-blue-500  " />
        )}
        <div>
          <p className="text-sm text-primary/60">Appointment Date</p>
          <p className=" text-primary">{formatDate(slotDay)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {consultationFee ? (
          <div className="bg-white p-3 rounded-full ">
            <Clock className="h-5 w-5  text-chart-2" />
          </div>
        ) : (
          <Clock className="h-5 w-5 text-blue-500" />
        )}
        <div>
          <p className="text-sm text-gray-500">Appointment Time</p>
          <p className=" text-gray-900">{formatTime(slotTime)}</p>
        </div>
      </div>
      {consultationFee && (
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-full ">
            <IndianRupee className="h-5 w-5  text-chart-2" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Consultation Fee</p>
            <span className="line-through mr-2 text-xs text-gray-500">
              ₹{amount?.toLocaleString()}
            </span>
            <span className="text-gray-900 font-semibold">
              ₹{consultationFee?.toLocaleString()}
            </span>
            <p className="text-xs text-gray-500 mt-1">
              Pay at the time of consultation
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
