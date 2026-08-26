import React from "react";
import { UserReviewType } from "@/models/schema";
import { Rating } from "@/components/custom/ServerComponents";
import { format } from "date-fns";
import { ThumbsUp, Flag, CheckCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface ReviewCardProps {
    review: UserReviewType;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <article className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-50">
                        {review.user?.image ? (
                            <Image src={review.user.image} alt={review.user.firstName} width={56} height={56} className="object-cover" />
                        ) : (
                            <span className="text-primary font-bold text-base md:text-lg uppercase">
                                {review.user?.firstName?.[0]}{review.user?.lastName?.[0]}
                            </span>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm md:text-base">{review.user?.firstName} {review.user?.lastName}</h4>
                            <span className="bg-slate-900 text-white text-[8px] md:text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter shrink-0">Verified Patient</span>
                        </div>
                        <p className="text-xs md:text-sm text-slate-500">{review.createdAt ? format(new Date(review.createdAt), "MMMM dd, yyyy") : "Recent Review"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Rating rating={review.rating.toString()} />
                </div>
            </div>
            <div className="mb-4">
                {Number(review.rating) >= 4 && (
                    <span className="inline-flex items-center gap-1 text-primary text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full mb-3">
                        <ShieldCheck className="w-3 h-3" />
                        Top Review
                    </span>
                )}
                <p className="text-slate-700 leading-relaxed text-base md:text-lg break-words">
                    &quot;{review.review}&quot;
                </p>
            </div>
            <div className="flex items-center gap-6 pt-6 border-t border-slate-50">
                <button className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful
                </button>
                <button className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors">
                    <Flag className="w-4 h-4" />
                    Report
                </button>
            </div>
        </article>
    );
};
