"use client";
import Image from "next/image";
import { reviewList } from "@/constants/response";
import { cn, formatAmount, getLangString } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Star, GraduationCap, Briefcase, Languages, ShieldCheck } from "lucide-react";
import { Testimonial } from "@/app/(root)/components/TestimonialList";
import { DoctorDetailsType, UserReviewType } from "@/models/schema";
import { useGetDoctorReviewsQuery } from "@/services/query/doctorQuery";
import CustomLoading from "@/components/custom/CustomLoading";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DoctorsInfo = ({ doctorInfo }: { doctorInfo: DoctorDetailsType }) => {
  const list =
    doctorInfo.ratingCount !== "0" ? ["About", "Patient Stories"] : ["About"];
  const [activeTab, setActiveTab] = useState(list[0]);
  const router = useRouter();
  const { data, isPending } = useGetDoctorReviewsQuery({
    doctorId: doctorInfo.id,
    page: 1,
    limit: 5,
    isAscending: false,
    sortBy: "DATE",
  });

  const fee = parseFloat(doctorInfo!.fee);
  const discountPercent = parseFloat(doctorInfo!.discountAmt);
  const payableAmount = fee - (fee * discountPercent) / 100;
  const formattedRating = parseFloat(doctorInfo.rating || "0").toFixed(1);

  console.log({ language: doctorInfo.languages.map((lang) => lang + " ") });
  return isPending ? (
    <CustomLoading />
  ) : (
    <section className={cn("!w-full")}>
      <article className="space-y-6 px-3 !w-full">
        <div className="flex flex-col sm:flex-row items-center rounded-2xl bg-white/50 backdrop-blur-xl p-4 gap-4 border ">
          <div className="flex flex-col gap-y-2 items-center ">
            <Image
              src={doctorInfo.image}
              alt={doctorInfo.name}
              width={160}
              height={160}
              className=" w-28 h-28  sm:w-36 sm:h-36 rounded-full bg-slate-200 bg-cover bg-top  border-3 sshadow-md shadow-gray-200  "
            />
            {doctorInfo.registrationNo && (
              <span className="text-[9px] text-slate-500 font-semibold w-20 text-center ">
                Registration No : {doctorInfo.registrationNo}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-evenly ml-4 space-y-3 ">
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-slate-800">{doctorInfo.name}</h3>
              <p className="text-sm text-primary/80 font-semibold font-sans">
                {doctorInfo.categories
                  .map((cat) => cat.name)
                  .join(" | ")}
              </p>
            </div>
            <div className="space-y-1.5 text-neutral-600 text-sm font-sans font-semibold">
              <p>{doctorInfo.education}</p>
              <p>{doctorInfo.experience}</p>
              {doctorInfo.bookingAccuracy && (
                <p className="text-sm  flex items-start flex-wrap gap-x-2 gap-y-1   ">
                  <span className="whitespace-nowrap">Booking Accuracy :</span>
                  <span className="text-green-700 font-bold tracking-wider">
                    {" "}
                    {doctorInfo?.bookingAccuracy}%
                  </span>
                </p>
              )}
              <div className="text-sm  flex items-start flex-wrap gap-x-2 gap-y-1   ">
                <span className="whitespace-nowrap">Consultation Fee :</span>
                {/* <span className="text-green-700 font-bold tracking-wider">
                  {" "}
                  {doctorInfo.fee}
                </span> */}
                <p className="font-medium text-gray-700">
                  {doctorInfo.discountAmt && doctorInfo.discountAmt !== "0" && <span className="line-through mr-2 text-xs">
                    ₹{doctorInfo?.fee?.toLocaleString()}
                  </span>}
                  <span className="text-green-700  font-semibold">
                    ₹{payableAmount.toLocaleString()}
                  </span>
                </p>
                <span className="text-xs text-gray-500 w-full mt-1">
                  Pay at the time of consultation
                </span>
              </div>
              <p className="text-sm  flex items-start flex-wrap gap-x-2 gap-y-1   ">
                <span className="whitespace-nowrap">Languages Known :</span>
                <span className="text-green-700 font-bold tracking-wider">
                  {" "}
                  {getLangString(doctorInfo.languages.map((lang) => { return lang }))}
                </span>{" "}
              </p>
            </div>
          </div>
        </div>

        {/* I'll use a larger block to ensure I don't miss the tab rendering */}
        <div className="flex flex-col gap-y-2 rounded-2xl bg-white filter backdrop-blur-md p-4 sm:p-8 border mb-2 w-full [scrollbar-gutter:stable]">
          <ul className="mb-4 flex space-x-4 ">
            {list.map((item, index) => (
              <Button
                variant={activeTab === item ? "default" : "outline"}
                key={index}
                onClick={() => setActiveTab(item)}
                className="shadow-none sm:px-7 rounded-full"
              >
                {item}{" "}
                {item === "Patient Stories" && (
                  <span className="flex items-center gap-x-1 ml-2 px-2 py-0.5 bg-slate-900 text-white rounded-full text-[10px]">
                    <Star className="size-3 text-orange-400 fill-orange-400" />
                    <span className="font-bold">{formattedRating}</span>
                    <span className="opacity-70">({doctorInfo.ratingCount})</span>
                  </span>
                )}
              </Button>
            ))}
          </ul>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1]
              }}
              style={{ width: "100%" }}
              className="w-full min-h-[400px]"
            >
              <div className="h-fit w-full">
                {activeTab === "About" && (
                  <div className="w-full space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <GraduationCap className="size-5" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Education</p>
                          <p className="text-sm font-semibold text-slate-700">{doctorInfo.education}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <Briefcase className="size-5" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Experience</p>
                          <p className="text-sm font-semibold text-slate-700">{doctorInfo.experience}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <Languages className="size-5" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Languages</p>
                          <p className="text-sm font-semibold text-slate-700">
                            {doctorInfo.languages.join(", ")}
                          </p>
                        </div>
                      </div>
                      {doctorInfo.registrationNo && (
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <ShieldCheck className="size-5" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Verified Professional</p>
                            <p className="text-sm font-semibold text-slate-700">Reg: {doctorInfo.registrationNo}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="max-w-none text-slate-600 leading-[1.8] text-[15px] space-y-4">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                          ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4 space-y-2" {...props} />,
                          ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-4 space-y-2" {...props} />,
                          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 text-slate-800" {...props} />,
                          h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mb-3 text-slate-800" {...props} />,
                          h3: ({ node, ...props }) => <h3 className="text-lg font-medium mb-2 text-slate-800" {...props} />,
                        }}
                      >
                        {doctorInfo.description}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
                {activeTab === "Patient Stories" && (
                  <div className="flex flex-col gap-4 xl:w-[900px]">
                    <ul className="space-y-4 w-fit mx-auto">
                      {data?.map((review: UserReviewType, i: number) => (
                        // <ReviewCard key={review.id} {...review} />
                        <Testimonial
                          key={review.id}
                          testimonial={review.review}
                          userName={
                            review.user.firstName + " " + review.user.lastName
                          }
                          rating={review.rating}
                          date={review.createdAt}
                          className="!w-full h-fit"
                        />
                      ))}
                    </ul>
                    <Button
                      onClick={() => router.push("/reviews")}
                      className="w-40 !mx-auto rounded-xl border-muted-foreground bg-transparent border shadow-none text-primary hover:bg-transparent font-semibold"
                    >
                      View more{" "}
                      <ArrowRight className="size-4 animate-bounce-x" />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* <div className="h-20" /> */}
      </article>
    </section>
  );
};

export default DoctorsInfo;
