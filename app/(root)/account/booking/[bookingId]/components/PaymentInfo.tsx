import React from "react";
import { CreditCard, Receipt } from "lucide-react";

interface PaymentInfoProps {
  fee: number;
  paymentStatus?: string;
  referenceNo?: string;
  showHeading?: boolean;
  discounted?: number;
}

export default function PaymentInfo({
  fee,
  paymentStatus,
  referenceNo,
  discounted,
  showHeading = true,
}: PaymentInfoProps) {
  return (
    <div className="space-y-3 p-4  rounded-lg font-medium">
      {showHeading && (
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          Payment Details
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-primary/60">
            {showHeading ? "Amount" : "Consultation Fee"}
          </p>
          <p className="font-medium text-primary flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-400" />
            <span className="line-through mr-1 text-sm text-gray-500">
              ₹{fee?.toLocaleString()}
            </span>
            <span className="text-gray-900 font-semibold">
              ₹{discounted?.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Pay at the time of consultation
          </p>
        </div>
        {paymentStatus && (
          <div>
            <p className="text-sm text-primary/60">Payment Status</p>
            <p
              className={`font-medium ${
                paymentStatus === "PAID" ? "text-green-600" : "text-red-600"
              }`}
            >
              {paymentStatus}
            </p>
          </div>
        )}
        {referenceNo && (
          <div>
            <p className="text-sm text-primary/60">Reference Number</p>
            <p className="font-medium text-primary">{referenceNo}</p>
          </div>
        )}
      </div>
    </div>
  );
}
