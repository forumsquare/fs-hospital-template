import { AppointmentHistoryType } from "@/models/schema";
import { Phone, Mail } from "lucide-react";

interface ContactInfoProps {
  contactDetails: AppointmentHistoryType;
  showHeading?: boolean;
}

const ContactInfo = ({ contactDetails }: ContactInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4  rounded-lg">
      {contactDetails.phoneNo && (
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-900">
              {contactDetails.phoneNo}
            </p>
          </div>
        </div>
      )}
      {contactDetails.email && (
        <div className="flex items-center space-x-3 p-0">
          <Mail className="!size-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{contactDetails.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
