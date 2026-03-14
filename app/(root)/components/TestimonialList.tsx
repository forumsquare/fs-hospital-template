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
        "bg-card max-w-[200px] border border-border rounded-3xl transition-all p-2 h-full flex flex-col justify-between !min-w-[calc(100vw-8rem)] md:!min-w-[calc(100vw-10rem)] lg:!min-w-[calc(100vw-50rem)] xl:!min-w-[calc(100vw-65rem)]  shrink-0",
        className
      )}
    >
      {testimonial && (
        <blockquote className="p-8 relative">
          <Image
            src="/icons/quote-open.svg"
            alt="quote-open"
            className=" w-5 h-5 absolute  top-2 left-2 "
            width={25}
            height={25}
          />
          <p className="font-sans italic text-sm text-card-foreground leading-relaxed tracking-wide font-medium">
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
      <h2 className="text-2xl sm:text-4xl font-bold text-center pb-1">
        Testimonials
      </h2>
      <p className="text-center text-sm font-sans italic text-primary/50 font-medium max-w-screen-md px-2 mb-4 mx-auto">
        Hear from our patients about their experiences and the exceptional care
        they received from our dedicated team.
      </p>

      <Link
        href="/reviews"
        className="w-fit mx-auto flex items-center gap-1 text-primary  transition-all duration-200 hover:scale-110 active:scale-95 font-medium border p-2 px-5 rounded-xl border-primary my-4 mt-8"
      >
        View All <ArrowRight className="size-4 animate-bounce-x" />
      </Link>
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
