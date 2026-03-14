// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";
// import { useBookingHistory } from "@/stores/bookings";

// export const ComplaintDialog = ({
//   complaintDialog,
//   setComplaintDialog,
// }: {
//   complaintDialog: { isOpen: boolean; appointmentId: string | null };
//   setComplaintDialog: (dialog: {
//     isOpen: boolean;
//     appointmentId: string | null;
//   }) => void;
// }) => {
//   const { raiseComplaint } = useBookingHistory();
//   const [complaintText, setComplaintText] = useState("");

//   const handleComplaintSubmit = () => {
//     if (complaintDialog.appointmentId) {
//       raiseComplaint(complaintDialog.appointmentId, complaintText);
//       setComplaintDialog({ isOpen: false, appointmentId: null });
//       setComplaintText("");
//     }
//   };
//   return (
//     <Dialog
//       open={complaintDialog.isOpen}
//       onOpenChange={(isOpen) => {
//         if (!isOpen) {
//           setComplaintDialog({ isOpen: false, appointmentId: null });
//           setComplaintText("");
//         }
//       }}
//     >
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Submit a Complaint</DialogTitle>
//         </DialogHeader>
//         <div className="py-4">
//           <Textarea
//             placeholder="Please describe your complaint..."
//             value={complaintText}
//             onChange={(e) => setComplaintText(e.target.value)}
//             className="min-h-[100px]"
//           />
//         </div>
//         {/* <DialogFooter>
//           <Button
//             variant="outline"
//             onClick={() =>
//               setComplaintDialog({ isOpen: false, appointmentId: null })
//             }
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleComplaintSubmit}
//             disabled={!complaintText.trim()}
//           >
//             Submit Complaint
//           </Button>
//         </DialogFooter> */}
//       </DialogContent>
//     </Dialog>
//   );
// };
