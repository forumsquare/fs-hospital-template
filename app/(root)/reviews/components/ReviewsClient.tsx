"use client";

import React, { useState, useMemo } from "react";
import { ReviewType, UserReviewType, DoctorType } from "@/models/schema";
import { CustomHeader } from "@/components/custom/CustomHeader";
import { Testimonial } from "../../components/TestimonialList";
import { ReviewsFilter } from "./ReviewFilters";
import { Pagination } from "./Pagination";
import { useGetDoctorListQuery, useGetDoctorReviewsQuery } from "@/services/query/doctorQuery";
import CustomLoading from "@/components/custom/CustomLoading";


const ITEMS_PER_PAGE = 12;

interface ReviewsClientProps {
    initialDoctors: DoctorType[];
    initialReviews: UserReviewType[];
}

const ReviewsClient: React.FC<ReviewsClientProps> = ({ initialDoctors, initialReviews }) => {
    const { data: doctorsList, isPending: doctorsPending } = useGetDoctorListQuery({
        initialData: initialDoctors
    });

    const [selectedDoctor, setSelectedDoctor] = useState(initialDoctors?.[0]?.id || "");
    const [sortBy, setSortBy] = useState<"DATE" | "RATING">("DATE");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [currentPage, setCurrentPage] = useState(1);

    const { data: reviewsData, isPending: reviewsPending } = useGetDoctorReviewsQuery({
        doctorId: selectedDoctor,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        sortBy,
        isAscending: sortOrder === "asc",
    }, {
        initialData: selectedDoctor === initialDoctors?.[0]?.id && currentPage === 1 && sortBy === "DATE" && sortOrder === "desc"
            ? initialReviews
            : undefined
    });

    const doctors = doctorsList?.map((doctor: DoctorType) => ({ doctor: doctor.name, id: doctor.id })) || [];

    const reviews = reviewsData || [];

    // Total pages calculation - this is tricky without total count from API
    // For now keeping it simple as before, but normally you'd want a total count.
    const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE) || 1;

    return (
        <div className=" mx-auto px-4 py-8 !max-w-2xl ">
            <CustomHeader title="Patient Reviews" className="!w-full" />

            <ReviewsFilter
                doctors={doctors}
                selectedDoctor={selectedDoctor}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onDoctorChange={(id: string) => {
                    setSelectedDoctor(id);
                    setCurrentPage(1);
                }}
                onSortChange={setSortBy}
                onOrderChange={setSortOrder}
            />

            {reviewsPending || doctorsPending ? (
                <CustomLoading />
            ) : (
                <div className="space-y-6">
                    {reviews.map((review: UserReviewType) => (
                        <Testimonial
                            key={review.id}
                            rating={review.rating}
                            testimonial={review.review}
                            userName={review.user.firstName + " " + review.user.lastName}
                            date={review.createdAt}
                            className="!w-full"
                        />
                    ))}
                    {reviews.length === 0 && <p className="text-center text-muted-foreground">No reviews found for this doctor.</p>}
                </div>
            )}

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};

export default ReviewsClient;
