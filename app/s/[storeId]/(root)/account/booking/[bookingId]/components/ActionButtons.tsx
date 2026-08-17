import React, { useState } from "react";
import { Star, AlertCircle, XCircle, Loader2 } from "lucide-react";
import RatingModal from "./RatingModal";
import ComplaintModal from "./ComplaintModal";
import { Button } from "@/components/ui/button";
import { CancelButton, CustomButton } from "@/components/custom/CustomButtons";
import { useCancelAppointmentMutation } from "@/services/query/appointmentQuery";
import CancelAppointmentModal from "./CancelAppointmentModal";

interface ActionButtonsProps {
  storeId: string;
  bookingId: string;
  showRating: boolean;
  showComplaint: boolean;
  showCancel: boolean;
  onCancel?: () => void;
}

export default function ActionButtons({
  storeId,
  bookingId,
  showRating,
  showComplaint,
  showCancel,
  onCancel,
}: ActionButtonsProps) {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <div className="flex flex-row gap-2 sm:gap-4 w-full">
      {showComplaint && (
        <Button
          size="lg"
          onClick={() => setShowComplaintModal(true)}
          className="p-2 flex-1 sm:p-4 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100 transition-colors border border-orange-500 hover:border-orange-600 !m-0"
        >
          <AlertCircle className="h-4 w-4" />
          Raise Complaint
        </Button>
      )}
      {showRating && (
        <CustomButton
          onClick={() => setShowRatingModal(true)}
          className="bg-gradient-to-r from-chart-4 to-chart-5 text-chart-3 border-none"
        >
          <Star className="h-4 w-4" />
          Rate Appointment
        </CustomButton>
      )}

      {showCancel && (
        <CancelButton
          // disabled={cancelPending}
          onClick={() => setShowCancelModal(true)}
        >
          <XCircle className="h-4 w-4" />
          Cancel Booking{" "}
          {/* {cancelPending && <Loader2 className="animate-spin " />} */}
        </CancelButton>
      )}

      {showRatingModal && (
        <RatingModal
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          bookingId={bookingId}
          storeId={storeId}
        />
      )}

      {showComplaintModal && (
        <ComplaintModal
          isOpen={showComplaintModal}
          onClose={() => setShowComplaintModal(false)}
          bookingId={bookingId}
          storeId={storeId}
        />
      )}
      {showCancelModal && (
        <CancelAppointmentModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          bookingId={bookingId}
          storeId={storeId}
        />
      )}
    </div>
  );
}
