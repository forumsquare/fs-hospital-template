// import { Building2, Clock, Mail, MapPin, Phone } from "lucide-react";
// import { BookingDetailType } from "@/models/schema";
// interface HospitalInfoProps {
//   hospitalInfo: BookingDetailType["hospitalInfo"];
// }

import { AppointmentStoreType, HospitalInfoType } from "@/models/schema";
import { Hospital } from "lucide-react";

// const HospitalInfo = ({ hospitalInfo }: HospitalInfoProps) => {
//   return (
//     <div className="max-w-3xl mx-auto">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
//           <div className="flex justify-between items-center">
//             <h4 className="text-2xl font-semibold text-blue-900">
//               Hospital Details
//             </h4>
//           </div>
//           <div className="mt-2 flex items-center gap-4 text-sm text-blue-600">
//             <span>Hospital ID: {hospitalInfo.id}</span>
//             <div className="flex items-center gap-1">
//               <Clock className="h-4 w-4" />
//               <span>
//                 Booked on{" "}
//                 {new Date(hospitalInfo.createdOn).toLocaleDateString()}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
//             <div className="bg-white p-3 rounded-full shadow-sm">
//               <Building2 className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="space-y-2">
//               <div>
//                 <h2 className="text-xl font-medium text-gray-900">
//                   {hospitalInfo.name}
//                 </h2>
//                 <p className="text-blue-600">{hospitalInfo.address}</p>
//               </div>
//               {hospitalInfo.address && (
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <MapPin className="h-4 w-4" />
//                   <span>{hospitalInfo.address}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
//             {hospitalInfo.phone && (
//               <div className="flex items-center space-x-3">
//                 <Phone className="h-5 w-5 text-blue-600" />
//                 <div>
//                   <p className="text-sm text-gray-500">Phone</p>
//                   <p className="font-medium text-gray-900">
//                     {hospitalInfo.phone}
//                   </p>
//                 </div>
//               </div>
//             )}
//             {hospitalInfo.email && (
//               <div className="flex items-center space-x-3">
//                 <Mail className="h-5 w-5 text-blue-600" />
//                 <div>
//                   <p className="text-sm text-gray-500">Email</p>
//                   <p className="font-medium text-gray-900">
//                     {hospitalInfo.email}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HospitalInfo;

const HospitalInfo: React.FC<AppointmentStoreType> = ({ name, address }) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-white border rounded-lg">
      <div className="bg-white p-3 rounded-full ">
        <Hospital className="h-6 w-6 text-chart-2" />
      </div>
      <div className="font-medium">
        <h4 className="text-xl font-bold text-primary">{name}</h4>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Address: </span>
          {address.address}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Area: </span>
          {address.area}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">City: </span>
          {address.city}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">State: </span>
          {address.state}
        </p>
        {address.contactNo && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Phone: </span>
            {address.contactNo}
          </p>
        )}
        {address.contactMail && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email: </span>
            {address.contactMail}
          </p>
        )}
      </div>
    </div>
  );
};

export default HospitalInfo;
