import SwapText from "@/components/custom/SwapText";
import { formatDate, getNextSevenDates } from "@/lib/utils";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useBookingStore } from "@/stores/booking";

const DateSlider = () => {
  const dates = getNextSevenDates(new Date());
  const { bookingDate, setBookingDate } = useBookingStore();
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const leftButtonRef = useRef<HTMLDivElement>(null);
  const rightButtonRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const clientWidth = scrollContainerRef.current.clientWidth;

      if (scrollLeft === 0) {
        leftButtonRef.current!.style.display = "none";
      } else {
        leftButtonRef.current!.style.display = "flex";
      }

      if (scrollLeft + clientWidth >= scrollWidth) {
        // Hide the right button when at the end
        rightButtonRef.current!.style.display = "none";
      } else {
        rightButtonRef.current!.style.display = "flex";
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    leftButtonRef.current!.style.display = "none";
    if (scrollContainer != null) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 150;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 150;
    }
  };

  return (
    <article className="space-y-4 border-b border-dashed ">
      <p className="font-sans font-semibold ">Select Date : </p>
      <div className="relative">
        <div
          onClick={scrollLeft}
          ref={leftButtonRef}
          className="absolute top-0 bottom-0 left-0 h-full rounded-full flex items-center justify-center z-10 bg-gradient-to-r from-slate-600 to-gray-900 shadow-sm shadow-slate-600/30 cursor-pointer hover:scale-[1.2] transition-all duration-300  active:scale-90 "
        >
          {/* <div className="size-7 w-12 bg-gradient-to-r from-gray-100 to-neutral-100/10 absolute !z-0 left-0" /> */}
          <Image
            src="/icons/arrow.svg"
            alt="left"
            width={14}
            height={14}
            className="p-1.5 w-full h-full rotate-180 !z-[10000000000]"
          />
        </div>

        <div
          onClick={scrollRight}
          ref={rightButtonRef}
          className="absolute top-0 bottom-0 h-full right-0 rounded-full flex items-center  justify-center z-10 bg-gradient-to-r from-slate-600 to-gray-900 shadow-sm shadow-slate-600/30 cursor-pointer hover:scale-[1.2] transition-all duration-300  active:scale-90 "
        >
          {/* <div className="size-7 w-12 bg-gradient-to-r from-transparent to-gray-100 absolute !z-0 right-0" /> */}
          <Image
            src="/icons/arrow.svg"
            alt="right"
            width={14}
            height={14}
            className="p-1.5 w-full h-full !z-[10000000000000000000]"
          />
        </div>

        <ul
          className="w-full flex flex-nowrap  overflow-auto  scrollbar-hide scroll-smooth gap-x-2 mb-2.5 px-5 pr-8 rounded-full"
          ref={scrollContainerRef}
        >
          {dates.map((date) => (
            <li key={date.getDate()} className="text-nowrap">
              <SwapText
                initialText={formatDate(date)}
                finalText={formatDate(date)}
                textClassName=" "
                initialTextClassName="text-sm w-full px-2.5 py-1 border-primary/50 border rounded-full"
                finalTextClassName="bg-green-700 text-white text-sm w-full px-2.5 py-[5px] rounded-full !border-none "
                supportsHover={false}
                revert={date.getDate() !== bookingDate.getDate()}
                onClick={() => setBookingDate(date)}
                defaultAnimate={date.getDate() === bookingDate.getDate()}
              />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default DateSlider;
