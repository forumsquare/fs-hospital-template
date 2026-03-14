import React from "react";
import { User, Star, Calendar } from "lucide-react";
import { ReviewType } from "@/models/schema";

interface ReviewCardProps {
  review: ReviewType;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="rounded-xl bg-white p-6 border mb-8">
      <div className="flex items-center mb-4">
        <div className="p-2.5 rounded-full bg-green-100">
          <User className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1 mx-3">
          <p className="font-semibold text-gray-800">{review.name}</p>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-0.5">
            <Calendar className="w-4 h-4" />
            {new Date(review.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < parseFloat(review.rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-200"
            }`}
          />
        ))}
      </div>
      

      <p className="text-gray-600 leading-relaxed mb-4">{review.review}</p>

      <div className="flex items-center gap-2">
        <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
          Dr. {review.doctorName}
        </span>
      </div>
    </div>
  );
};
