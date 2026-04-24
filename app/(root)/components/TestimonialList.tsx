"use client";
import Image from "next/image";
import { TestimonialType } from "@/models/schema";
import { FC } from "react";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { Rating } from "@/components/custom/ServerComponents";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";

type TestimonialProps = {
  rating: string;
  testimonial: string;
  userName: string;
  className?: string;
  date?: string;
};
export const Testimonial: FC<TestimonialProps> = ({
  rating,
  testimonial,
  userName,
  className,
  date,
}) => {
  // console.log({ rating });
  return (
    <div
      className={cn(
        "bg-card w-full max-w-[300px] sm:max-w-full border border-border rounded-3xl transition-all p-2 h-full flex flex-col justify-between ",
        className
      )}
    >
      {testimonial && (
        <blockquote className="p-6 md:p-8 relative">
          <Image
            src="/icons/quote-open.svg"
            alt="quote-open"
            className=" w-5 h-5 absolute  top-2 left-2 "
            width={25}
            height={25}
          />
          <p className="font-sans break-words italic text-sm text-card-foreground leading-relaxed tracking-wide font-medium">
            {testimonial}
          </p>
          <Image
            src="/icons/quote-close.svg"
            alt="quote"
            className="w-4 h-4 absolute right-2 bottom-2 "
            width={25}
            height={25}
          />
        </blockquote>
      )}
      <div className="flex items-center justify-between px-4 py-2 gap-3 pt-auto">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center p-2 shadow-sm">
          <Image
            src="/icons/account.svg"
            alt="account"
            width={25}
            height={25}
            className="opacity-70"
          />
        </div>
        <div className="flex-1 text-start">
          <p className="text-muted-foreground tracking-wide font-medium text-xs">
            {userName}
          </p>
          {date && (
            <p className="text-muted-foreground/60 text-[10px] mt-0.5">
              {format(new Date(date), "MMM d, yyyy h:mm a")}
            </p>
          )}
        </div>
        <Rating rating={rating} />
      </div>
    </div>
  );
};

type TestimonialListProps = {
  testimonials: TestimonialType[];
};

const TestimonialList = ({ testimonials }: TestimonialListProps) => {
  return (
    <div className=" p-4">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:items-center justify-between w-full px-4 sm:px-8">
        <div className="flex-1 flex flex-col items-start">
          <h2 className="text-2xl sm:text-4xl font-bold text-center pb-1">
            Testimonials
          </h2>
          <p className="text-sm font-sans italic text-slate-500 font-medium leading-relaxed">
            Hear from our patients about their experiences and the exceptional care
            they received from our dedicated team.
          </p>
        </div>

        <Link
          href="/reviews"
          className="flex-shrink-0 flex items-center gap-2 px-8 py-3 text-[#0057b7] transition-all duration-300 hover:bg-[#0057b7] hover:text-white font-bold border-2 rounded-2xl border-[#0057b7]/20 hover:border-[#0057b7]"
        >
          View All <ArrowRight className="size-4" />
        </Link>
      </div>
      {testimonials.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          No testimonials available right now.
        </p>
      ) : (
        <InfiniteMovingCards speed="slow">
          {testimonials.map((review) => (
            <Testimonial
              key={review.id}
              rating={review.rating}
              testimonial={review.testimonial}
              userName={review.userName}
            // date={review.}
            />
          ))}
        </InfiniteMovingCards>
      )}
    </div>
  );
};

export default TestimonialList;
