import { formatTime, formatDate } from "@/lib/utils";
import { genderList } from "@/constants/list";
import { useBookingStore } from "@/stores/booking";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Phone,
  MessageSquare,
  Mail,
  CreditCard,
  Stethoscope,
} from "lucide-react";

export const BookingInfo = ({
  showPatientInfo,
}: {
  showPatientInfo?: boolean;
}) => {
  const { bookingDate, doctorInfo, bookingTime, bookingAddress, patientInfo } =
    useBookingStore();

  const fee = parseFloat(doctorInfo!.fee);
  const discountPercent = parseFloat(doctorInfo!.discountAmt);
  const payableAmount = fee - (fee * discountPercent) / 100;

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden max-w-md w-full border border-teal-100 transition-all duration-300 hover:shadow-lg">
      <div className="bg-teal-600 px-4 md:px-6 py-4">
        <h4 className="text-2xl font-bold text-white flex items-center gap-2">
          <Stethoscope className="w-6 h-6 text-teal-100" />
          {doctorInfo!.name}
        </h4>
        <p className="text-sm text-teal-100 font-sans mt-1">
          {doctorInfo!.categories.map((category) => category.name).join(", ")}
        </p>
      </div>

      <div className="px-4 md:px-6 py-5 space-y-5 bg-gradient-to-b from-teal-50 to-white">
        {/* Location Information */}
        <div className="flex items-center gap-3 text-gray-700 border-l-4 border-teal-500 pl-3 py-1">
          {/* <MapPin className="size-5 text-teal-600" /> */}
          <span className="text-sm font-medium">{bookingAddress?.name}</span>
        </div>

        {/* Appointment Details with medical-themed styling */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="flex items-center bg-teal-50 px-3 py-3 rounded-lg border border-teal-100">
            <CalendarDays className="w-5 h-5 mr-2 text-teal-600" />
            <span className="text-sm text-gray-700">
              {formatDate(bookingDate)}
            </span>
          </div>
          <div className="flex items-center bg-teal-50 px-3 py-3 rounded-lg border border-teal-100">
            <Clock className="w-5 h-5 mr-2 text-teal-600" />
            <span className="text-sm text-gray-700">
              {formatTime(bookingTime!)}
            </span>
          </div>
        </div>

        {/* Fee information with medical-themed styling */}
        <div className="flex flex-col bg-teal-50 px-4 py-3 rounded-lg border border-teal-100">
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-teal-600" />
            <p className="font-medium text-gray-700">
              <span className="line-through mr-2 text-sm">
                ₹{doctorInfo?.fee?.toLocaleString()}
              </span>
              <span className="text-gray-900 font-semibold">
                ₹{payableAmount.toLocaleString()}
              </span>
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-7">
            (Pay at the time of consultation)
          </p>
        </div>

        {/* Patient Information Section with medical styling */}
        {showPatientInfo && (
          <div className="mt-4 pt-4 border-t border-teal-100">
            <div className="space-y-4">
              <h5 className="text-lg font-bold text-teal-700 flex items-center">
                <User className="w-5 h-5 mr-2 text-teal-600" />
                Patient Information
              </h5>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="font-medium text-gray-800 mb-2">
                  {patientInfo!.name}
                </p>

                <div className="space-y-2 text-sm">
                  {patientInfo?.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-blue-500" />
                      <p>{patientInfo!.email}</p>
                    </div>
                  )}

                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{patientInfo?.phone}</span>
                  </div>

                  <div className="flex justify-between text-gray-600 pt-2 border-t border-blue-100 mt-2">
                    <span>
                      Gender:{" "}
                      {genderList.find((g) => g.value === patientInfo?.gender)
                        ?.label ?? patientInfo?.gender}
                    </span>
                    <span>Age: {patientInfo?.age}</span>
                  </div>

                  {patientInfo?.comment && (
                    <div className="text-gray-600 pt-2 border-t border-blue-100 mt-2">
                      <div className="flex items-start">
                        <MessageSquare className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-blue-500" />
                        <p>Comment: &ldquo;{patientInfo!.comment}&ldquo;</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
