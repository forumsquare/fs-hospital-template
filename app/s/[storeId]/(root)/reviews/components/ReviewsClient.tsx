"use client";

import React, { useState, useMemo } from "react";
import { ReviewType, UserReviewType, DoctorType } from "@/models/schema";
import { ReviewCard } from "./ReviewCard";
import { Pagination } from "./Pagination";
import {
  useGetDoctorListQuery,
  useGetDoctorReviewsQuery,
} from "@/services/query/doctorQuery";
import CustomLoading from "@/components/custom/CustomLoading";
import {
  Star,
  Edit3,
  ArrowLeft,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 12;

interface ReviewsClientProps {
  initialDoctors: DoctorType[];
  initialReviews: UserReviewType[];
  initialDoctorId?: string;
}

const ReviewsClient: React.FC<ReviewsClientProps> = ({
  initialDoctors,
  initialReviews,
  initialDoctorId,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  // Session is read from a cookie (no fetch/redirect on page load); it's only
  // consulted when the user clicks "Write a Review".
  const { isLoggedIn, isSessionLoading } = useSession();
  const { data: doctorsList, isPending: doctorsPending } =
    useGetDoctorListQuery({
      initialData: initialDoctors,
    });

  // Reviews are verified: a user reviews a doctor from a completed appointment.
  // Only checked on click — logged-out users go to login, logged-in users go to
  // their bookings (which lists completed visits they can rate).
  const handleWriteReview = () => {
    if (isSessionLoading) return;
    if (!isLoggedIn) {
      router.push(`/signup?redirect=${pathname}`);
      return;
    }
    toast.info("Open a completed appointment to write your review.");
    router.push("/account/booking");
  };

  const [selectedDoctor, setSelectedDoctor] = useState(
    initialDoctorId || initialDoctors?.[0]?.id || "",
  );
  const [sortBy, setSortBy] = useState<"DATE" | "RATING">("DATE");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleDoctorChange = (value: string) => {
    setSelectedDoctor(value === "ALL" ? "" : value);
    setCurrentPage(1);
  };

  const { data: reviewsData, isPending: reviewsPending } =
    useGetDoctorReviewsQuery(
      {
        doctorId: selectedDoctor,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        sortBy,
        isAscending: sortOrder === "asc",
      },
      {
        initialData:
          selectedDoctor ===
            (initialDoctorId || initialDoctors?.[0]?.id || "") &&
          currentPage === 1 &&
          sortBy === "DATE" &&
          sortOrder === "desc"
            ? initialReviews
            : undefined,
      },
    );

  const reviews = useMemo(() => reviewsData || [], [reviewsData]);
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE) || 1;

  // Calculate Breakdown Stats (based on current reviews as proxy)
  const stats = useMemo(() => {
    if (!reviews.length) return [0, 0, 0, 0, 0];
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((r: UserReviewType) => {
      const rating = Math.min(5, Math.max(1, Math.round(Number(r.rating))));
      counts[5 - rating]++;
    });
    return counts.map((c) => Math.round((c / reviews.length) * 100));
  }, [reviews]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return "0.0";
    const sum = reviews.reduce(
      (acc: number, r: UserReviewType) => acc + Number(r.rating),
      0,
    );
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
        <div className="space-y-3 md:space-y-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary font-medium hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="uppercase text-[9px] md:text-[10px] tracking-widest font-bold">
              Back
            </span>
          </button>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Patient Reviews
          </h1>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full border border-green-100 flex-shrink-0">
              <Star className="text-green-600 w-3.5 h-3.5 md:w-4 md:h-4 fill-green-600" />
              <span className="font-bold text-green-700 text-sm md:text-base">
                {averageRating}
              </span>
              <span className="text-green-600/60 text-xs md:text-sm">/ 5</span>
            </div>
            <p className="text-slate-500 font-medium tracking-tight text-sm">
              Based on {reviews.length}+ experiences
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleWriteReview}
          className="bg-primary text-white w-full md:w-auto px-8 py-3.5 md:py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          <Edit3 className="w-5 h-5" />
          Write a Review
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Summary & Filters */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Rating Summary Card */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-xl text-slate-900 mb-6">
              Review Breakdown
            </h3>
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((star, i) => (
                <div key={star} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-600 w-12">
                    {star} Star
                  </span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${stats[i]}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-slate-400 w-8">
                    {stats[i]}%
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Filter Section */}
          <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100/50">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-xl text-slate-900">
                Refine Results
              </h3>
            </div>

            <div className="space-y-6">
              {/* Doctor Select */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Filter by Doctor
                </label>
                <Select
                  value={selectedDoctor || "ALL"}
                  onValueChange={handleDoctorChange}
                >
                  <SelectTrigger className="w-full bg-white border-slate-100 rounded-xl py-6 px-4">
                    <SelectValue placeholder="All Doctors" />
                  </SelectTrigger>
                  <SelectContent className="z-[200000000000]">
                    <SelectGroup>
                      <SelectItem value="ALL">All Doctors</SelectItem>
                      {doctorsList?.map((doc: DoctorType) => (
                        <SelectItem key={doc.id} value={doc.id}>
                          {doc.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Sort Reviews
                </label>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setSortBy("DATE");
                      setSortOrder("desc");
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl transition-all duration-200 border-2 text-left",
                      sortBy === "DATE" && sortOrder === "desc"
                        ? "bg-white border-primary text-primary shadow-sm"
                        : "bg-white/50 border-transparent hover:bg-white text-slate-600",
                    )}
                  >
                    <span className="flex items-center gap-2 font-bold text-sm">
                      <Calendar className="w-4 h-4" />
                      Newest First
                    </span>
                    {sortBy === "DATE" && sortOrder === "desc" && (
                      <Star className="w-4 h-4 fill-primary text-primary" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSortBy("RATING");
                      setSortOrder("desc");
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl transition-all duration-200 border-2 text-left",
                      sortBy === "RATING" && sortOrder === "desc"
                        ? "bg-white border-primary text-primary shadow-sm"
                        : "bg-white/50 border-transparent hover:bg-white text-slate-600",
                    )}
                  >
                    <span className="flex items-center gap-2 font-bold text-sm">
                      <TrendingUp className="w-4 h-4" />
                      Highest Rated
                    </span>
                    {sortBy === "RATING" && sortOrder === "desc" && (
                      <Star className="w-4 h-4 fill-primary text-primary" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSortBy("RATING");
                      setSortOrder("asc");
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl transition-all duration-200 border-2 text-left",
                      sortBy === "RATING" && sortOrder === "asc"
                        ? "bg-white border-primary text-primary shadow-sm"
                        : "bg-white/50 border-transparent hover:bg-white text-slate-600",
                    )}
                  >
                    <span className="flex items-center gap-2 font-bold text-sm">
                      <TrendingDown className="w-4 h-4" />
                      Lowest Rated
                    </span>
                    {sortBy === "RATING" && sortOrder === "asc" && (
                      <Star className="w-4 h-4 fill-primary text-primary" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </aside>

        {/* Main Content: Reviews List */}
        <div className="lg:col-span-8 space-y-6">
          {reviewsPending ? (
            <div className="flex flex-col gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-64 bg-slate-50 animate-pulse rounded-2xl border border-slate-100"
                ></div>
              ))}
            </div>
          ) : (
            <>
              {reviews.map((review: UserReviewType) => (
                <ReviewCard key={review.id} review={review} />
              ))}

              {reviews.length === 0 && (
                <div className="text-center py-24 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-slate-900 font-bold text-xl">
                    No reviews yet
                  </h3>
                  <p className="text-slate-500">
                    Be the first to share your experience!
                  </p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="pt-8 text-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ReviewsClient;
