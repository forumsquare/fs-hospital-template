import { Loader2, Star, StarHalf } from "lucide-react";
import Image from "next/image";

export const InputIcon = ({ src, alt }: { src: string; alt: string }) => {
  return <Image src={src} alt={alt} width={20} height={20} className="" />;
};

export const LoadingSpinner = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

// TODO : NEED TO WORK ON THE FRACTIONAL VALUES  -- Done!
export const Rating = ({ rating }: { rating: string | number }) => {
  const newRating = typeof rating === "string" ? parseFloat(rating) : rating;
  const fullStars = Math.floor(newRating);
  const decimalPart = newRating - fullStars;
  const hasPartialStar = decimalPart > 0;
  // console.log({ decimalPart, rating });

  return (
    <ul className="flex  flex-nowrap">
      {/* Render full stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <li key={`full-star-${index}`} className="w-5 h-5">
            {/* <Image
              src="/icons/star.svg"
              alt="full rating"
              width={16}
              height={16}
              className="filter invert"
            /> */}
            <Star className="w-5 h-5 text-orange-400" fill="orange" />
          </li>
        ))}
      {hasPartialStar && (
        <li className="w-5 h-5">
          <StarHalf className="w-5 h-5 text-orange-400" fill="orange" />
        </li>
      )}
    </ul>
  );
};
