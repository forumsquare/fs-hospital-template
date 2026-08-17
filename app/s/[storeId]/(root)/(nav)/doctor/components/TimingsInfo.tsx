import { CustomToolTip } from "@/components/custom/ClientComponents";
import {
  cn,
  dateToStringWithoutOffset,
  formatTime,
  getTimeSlots,
  stringToDateWithoutOffset,
} from "@/lib/utils";
import { BookingStatus } from "@/models/enums";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DateSlider from "./DateSlider";
import { useBookingStore } from "@/stores/booking";
import { Button } from "@/components/ui/button";
import AddressSelector from "./AddressSelector";
import { useGetSlotsQuery } from "@/services/query/doctorQuery";
import { useParams } from "next/navigation";
import { address_id } from "@/constants/constant";
import CustomLoading from "@/components/custom/CustomLoading";
import NoDataPage from "@/components/custom/NoDataPage";
import { toast } from "sonner";

const TimingsInfo = () => {
  const bookStore = useBookingStore();
  const { docSlug } = useParams();

  console.log({
    bookingDate: bookStore.bookingDate,
    bookingTime: bookStore.bookingTime,
  });
  // `refetch` is still used deliberately just before confirming a booking, to
  // re-check that the chosen slot is still free.
  const { data, refetch, isFetching } = useGetSlotsQuery({
    doctorId: docSlug as string,
    date: bookStore.bookingDate?.toISOString() || "",
    // No constant fallback here: an empty id leaves the query disabled until
    // AddressSelector resolves the real address, so exactly one slots request
    // goes out instead of one throwaway plus one real.
    addressId: bookStore.bookingAddress?.id ?? "",
  });

  // The date and address are part of the query key, so React Query refetches on
  // its own when either changes. The effect that used to sit here called
  // refetch() on those same dependencies — a workaround for the key omitting
  // them — which fired a second, identical request on every change.

  const available = "border border-green-800 shadow-neutral-200 bg-white";
  const selected =
    "bg-gradient-to-tr from-green-500 to-green-700 border-green-600 ";
  const booked = "bg-gradient-to-r from-rose-700 to-pink-600";
  const Running = "bg-gradient-to-tr from-orange-400 to-orange-500";
  const closed = "bg-gradient-to-r from-neutral-200 to-gray-300";

  const statusList = {
    Available: available,
    Selected: selected,
    Booked: booked,
    Running: Running,
    Closed: closed,
  };

  const [categorizedTimes, setCategorizedTimes] = useState({
    morning: [] as Date[],
    afternoon: [] as Date[],
    evening: [] as Date[],
    night: [] as Date[],
  });
  const [bookedList, setBookedList] = useState<string[]>([]);
  const [runningList, setRunningList] = useState<string[]>([]);
  const [closedList, setClosedList] = useState<string[]>([]);

  useEffect(() => {
    console.log({ data });
    if (!data) return;

    const newCateTimes = {
      morning: [] as Date[],
      afternoon: [] as Date[],
      evening: [] as Date[],
      night: [] as Date[],
    };

    let slotDuration = 20;
    if (data?.unAvailableSlots && data.unAvailableSlots.length > 0) {
      const firstBooked = data.unAvailableSlots[0];
      const fromParts = firstBooked.from.split(":").map(Number);
      const toParts = firstBooked.to.split(":").map(Number);

      const fromDate = new Date();
      fromDate.setHours(fromParts[0], fromParts[1], fromParts[2] || 0, 0);

      const toDate = new Date();
      toDate.setHours(toParts[0], toParts[1], toParts[2] || 0, 0);

      const diff = (toDate.getTime() - fromDate.getTime()) / (1000 * 60);
      if (diff > 0) slotDuration = diff;
    } else if (bookStore.doctorInfo?.slotDuration) {
      slotDuration = bookStore.doctorInfo.slotDuration;
    }

    const uniqueTimeSlotsSet = new Set<string>();
    const allSlots: Date[] = [];

    data?.timeslots?.forEach((slot: { from: string; to: string }) => {
      const datePrefix = (bookStore.bookingDate || new Date())
        .toISOString()
        .slice(0, 11);
      const toTime = new Date(`${datePrefix}${slot.to}`);

      toTime.setMinutes(toTime.getMinutes() - slotDuration);

      const items = getTimeSlots({
        start: `${datePrefix}${slot.from}`,
        end: toTime.toISOString(),
        duration: slotDuration,
      });

      items.forEach((time) => {
        const timeKey = time.toISOString();
        if (!uniqueTimeSlotsSet.has(timeKey)) {
          uniqueTimeSlotsSet.add(timeKey);
          allSlots.push(time);
        }
      });
    });

    // Sort all slots chronologically
    allSlots.sort((a, b) => a.getTime() - b.getTime());

    // Categorize unique and sorted slots
    allSlots.forEach((time) => {
      const hour = time.getHours();
      if (hour >= 4 && hour < 12) {
        newCateTimes.morning.push(time);
      } else if (hour >= 12 && hour < 17) {
        newCateTimes.afternoon.push(time);
      } else if (hour >= 17 && hour < 24) {
        newCateTimes.evening.push(time);
      } else {
        newCateTimes.night.push(time);
      }
    });

    setCategorizedTimes({ ...newCateTimes });

    const newBookedList: string[] = [];
    const newRunningList: string[] = [];
    const newClosedList: string[] = [];

    data?.unAvailableSlots?.forEach(
      (slot: { from: string; to: string; status: string }) => {
        if (slot.status === "RUNNING") {
          newRunningList.push(slot.from);
        } else if (slot.status === "CLOSED") {
          newClosedList.push(slot.from);
        } else {
          newBookedList.push(slot.from);
        }
      },
    );
    setBookedList(newBookedList);
    setRunningList(newRunningList);
    setClosedList(newClosedList);
    // console.log({ newCateTimes });
  }, [data, bookStore.bookingDate, bookStore.doctorInfo?.slotDuration]);

  const getBookingStatus = (time: Date): BookingStatus => {
    const timeString = dateToStringWithoutOffset(time)
      .split("Z")[0]
      .slice(11, 19);
    const actTime = stringToDateWithoutOffset(time.toISOString());

    const bookingDate = bookStore.bookingDate;
    const bookingTime = bookStore.bookingTime;

    console.log({ timeString, bookedList, time });

    if (bookedList.indexOf(timeString) >= 0) {
      return BookingStatus.BOOKED;
    }

    if (runningList.indexOf(timeString) >= 0) {
      return BookingStatus.RUNNING;
    }

    if (closedList.indexOf(timeString) >= 0) {
      return BookingStatus.CLOSED;
    }

    if (bookingDate.getDate() === new Date().getDate()) {
      const actualDate = new Date(bookingDate);
      actualDate.setHours(time.getHours(), time.getMinutes(), 0, 0);
      if (new Date() > actualDate) {
        return BookingStatus.CLOSED;
      }
    }

    console.log({ bookingTime, actTime });
    if (
      bookingTime?.getMinutes() === actTime.getMinutes() &&
      bookingTime.getHours() === actTime.getHours()
    ) {
      console.log("running here ---> ");
      return BookingStatus.SELECTED;
    }

    return BookingStatus.AVAILABLE;
  };

  const TimeSlot = ({ slot }: { slot: Date }) => {
    console.log({ slot });
    const status: BookingStatus = getBookingStatus(slot);
    return (
      <CustomToolTip content={<span>{status}</span>}>
        <div
          onClick={() => {
            console.log(slot);
            if (status == BookingStatus.AVAILABLE) {
              bookStore.setBookingTime(slot);
            }
          }}
          className={cn([
            "text-[13px] text-white rounded-full xl:px-3 py-1  transition-all duration-600 font-bold shadow-md cursor-not-allowed whitespace-nowrap ",
            status === BookingStatus.AVAILABLE &&
              "border-[2px] text-green-800 bg-white border-green-700 shadow-none cursor-pointer hover:scale-110 active:scale-[0.9]",
            status === BookingStatus.SELECTED &&
              "border-2 bg-gradient-to-tr from-green-500 to-green-700 border-green-600 font-extrabold shadow-neutral-200 cursor-pointer transition-all duration-600",
            status === BookingStatus.BOOKED &&
              "bg-gradient-to-r from-rose-700 to-pink-600 text-pink-100 shadow-pink-400/30",
            status === BookingStatus.RUNNING &&
              "bg-gradient-to-tr from-orange-400 to-orange-500 text-orange-100  ",
            status === BookingStatus.CLOSED &&
              "bg-gradient-to-r from-neutral-200 to-gray-300 text-slate-600  opacity-60  shadow-none ",
          ])}
        >
          {formatTime(slot)}
        </div>
      </CustomToolTip>
    );
  };

  const NoonSlots = ({
    src,
    title,
    slots,
  }: {
    src: string;
    title: string;
    slots: Date[];
  }) => {
    return (
      <>
        {slots.length > 0 && (
          <div className="grid gap-y-4">
            <div className="flex items-center gap-x-3">
              <Image src={src} alt={title} width={30} height={30} />
              <span className="font-sans  font-semibold text-neutral-700 text-lg">
                {title}
              </span>
            </div>
            <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {slots.map((slot) => (
                <TimeSlot key={slot.toISOString()} slot={slot} />
              ))}
            </ul>
          </div>
        )}
      </>
    );
  };

  return (
    <section className="space-y-6 text-start h-full w-full overflow-scroll py-10 lg:py-0 pb-20 lg:pb-14 rounded-xl ">
      <AddressSelector doctorId={docSlug as string} />
      <DateSlider />
      <div className="grid gap-y-8">
        <div className="space-y-3">
          <p className="font-sans font-semibold ">Select Time Slot :</p>
          <ul className="flex flex-wrap gap-3.5">
            {Object.entries(statusList).map(([title, val]) => (
              <li className="flex gap-x-1 items-center" key={val}>
                <div className={cn(["w-4 h-4 rounded-sm", val])} />
                <span className="text-xs font-semibold text-neutral-500">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {categorizedTimes.morning.length === 0 &&
          categorizedTimes.afternoon.length === 0 &&
          categorizedTimes.evening.length === 0 &&
          categorizedTimes.night.length === 0 &&
          !isFetching && (
            <NoDataPage title="Doctor not available" className="!min-h-36" />
          )}
        {isFetching ? (
          <CustomLoading className="h-96" />
        ) : (
          <>
            <NoonSlots
              src="/icons/morning.svg"
              title="Morning"
              slots={categorizedTimes.morning}
            />
            <NoonSlots
              src="/icons/afternoon.svg"
              title="Afternoon"
              slots={categorizedTimes.afternoon}
            />
            <NoonSlots
              src="/icons/evening.svg"
              title="Evening"
              slots={categorizedTimes.evening}
            />
            <NoonSlots
              src="/icons/evening.svg"
              title="Night"
              slots={categorizedTimes.night}
            />
          </>
        )}
      </div>
      <div className="flex  p-3  w-full absolute !bottom-0 left-0 right-0  backdrop-blur-sm  h-[70px]">
        <Button
          onClick={async () => {
            if (!bookStore.bookingTime) {
              return;
            }

            const result = await refetch();

            if (result.data) {
              const timeString = dateToStringWithoutOffset(
                bookStore.bookingTime,
              )
                .split("Z")[0]
                .slice(11, 19);

              const newBookedList =
                result.data?.unAvailableSlots?.map(
                  (slot: { from: string; to: string }) => slot.from,
                ) || [];

              if (newBookedList.includes(timeString)) {
                toast.error(
                  "Selected slot is no longer available. Please choose another slot.",
                );
                bookStore.setBookingTime(undefined);
                return;
              }
            }

            bookStore.setIndex(1);
          }}
          variant={bookStore.bookingTime ? "default" : "outline"}
          className={cn([
            "flex-1 font-extrabold  ",
            bookStore.bookingTime
              ? "bg-gradient-to-tr from-green-500 to-green-700 border-green-600 border-2"
              : "bg-gradient-to-tr from-neutral-100 to-neutral-300 shadow-sm",
          ])}
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default TimingsInfo;
