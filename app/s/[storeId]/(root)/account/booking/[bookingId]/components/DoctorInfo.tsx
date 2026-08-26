import React from "react";
import { Heart, Award, MapPin } from "lucide-react";
import { AppointmentConsultantType } from "@/models/schema";

interface DoctorInfoProps {
  name: string;
  specialisation: string;
  experience: string;
  address: string;
}

export default function DoctorInfo({
  name,
  categories,
}: AppointmentConsultantType) {
  return (
    <div className="flex items-start space-x-4 p-4 bg-white border rounded-lg">
      <div className="bg-white p-3 rounded-full ">
        <Heart className="h-6 w-6 text-chart-2" />
      </div>
      <div className="space-y-2">
        <div>
          <h2 className="text-xl font-bold text-primary">{name}</h2>
          <p className="text-chart-2 font-medium">
            {categories.join(", ") || "Healthcare Professional"}
          </p>
        </div>
        {/* {experience && (
          <div className="flex items-center gap-2 text-gray-600">
            <Award className="h-4 w-4" />
            <span>{experience} years of experience</span>
          </div>
        )} */}
        {/* {address && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{address}</span>
          </div>
        )} */}
      </div>
    </div>
  );
}
