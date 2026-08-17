import { AppointmentType } from "@/models/schema";
import { User } from "lucide-react";
import React from "react";

const PatientInfo = ({ userInfo }: { userInfo: AppointmentType }) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-white border rounded-lg">
      <div className="bg-white p-3 rounded-full ">
        <User className="h-6 w-6 text-chart-2" />
      </div>
      <div className="font-medium">
        <h4 className="text-xl font-bold text-primary">{userInfo.name}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 pt-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Phone: </span>
            {userInfo.phoneNo}
          </p>
          {userInfo.email && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email: </span>
              {userInfo.email}
            </p>
          )}
          {userInfo.gender && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Gender: </span>
              {userInfo.gender}
            </p>
          )}
          {userInfo.age && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Age: </span>
              {userInfo.age}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
