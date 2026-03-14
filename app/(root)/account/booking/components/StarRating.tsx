// "use client";

// import { useState } from "react";
// import { Star } from "lucide-react";
// import { useBookingHistory } from "@/stores/bookings";

// interface StarRatingProps {
//   appointmentId: string;
//   initialRating: number;
// }

// export const StarRating = ({
//   appointmentId,
//   initialRating,
// }: StarRatingProps) => {
//   const { rateAppointment } = useBookingHistory();

//   const handleRating = (selectedRating: number) => {
//     rateAppointment(appointmentId, selectedRating);
//   };

//   return (
//     <div className="flex items-center gap-1">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <button
//           key={star}
//           type="button"
//           onClick={() => handleRating(star)}
//           className="focus:outline-none"
//         >
//           <Star
//             size={24}
//             className={`transition-colors ${
//               star <= initialRating
//                 ? "fill-yellow-400 text-yellow-400"
//                 : "text-gray-300"
//             }`}
//           />
//         </button>
//       ))}
//     </div>
//   );
// };
