import React from "react";
import { getDoctorsListSSR, getDoctorReviewsSSR, getStoreInfoSSR } from "@/services/api/server";
import ReviewsClient from "./components/ReviewsClient";
import { UserReviewType } from "@/models/schema";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const store = await getStoreInfoSSR();
  return {
    title: `Patient Reviews | ${store.name}`,
    description: "Read what our patients have to say about their experiences and treatments.",
  };
}


const ITEMS_PER_PAGE = 12;

export default async function ReviewsPage() {
  try {
    const doctorsList = await getDoctorsListSSR();
    const initialDoctorId = doctorsList?.[0]?.id || "";

    let initialReviews: UserReviewType[] = [];
    if (initialDoctorId) {
      initialReviews = await getDoctorReviewsSSR({
        doctorId: initialDoctorId,
        page: 1,
        limit: ITEMS_PER_PAGE,
        sortBy: "DATE",
        isAscending: false
      });
    }

    return (
      <ReviewsClient
        initialDoctors={doctorsList || []}
        initialReviews={initialReviews || []}
      />
    );
  } catch (error) {
    console.error("Error in ReviewsPage SSR:", error);
    return <ReviewsClient initialDoctors={[]} initialReviews={[]} />;
  }
}

