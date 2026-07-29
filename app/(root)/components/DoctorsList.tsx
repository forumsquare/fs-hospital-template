"use client";
import { Button } from "@/components/ui/button";
import { DoctorType } from "@/models/schema";
import { Card } from "@/components/ui/card";
import { Star, Clock, ChevronRight, StarIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const DoctorCard = ({
  doctor,
  onBookAppointment,
}: {
  doctor: DoctorType;
  onBookAppointment: (doctorId: string) => void;
}) => {
  const fee = parseFloat(doctor.fee);
  const discountPercent = parseFloat(doctor.discountAmt);
  const payableAmount = fee - (fee * discountPercent) / 100;
  const formattedRating = parseFloat(doctor.rating || "4.8").toFixed(1);
  const hasDiscount = discountPercent > 0;

  return (
    <div
      className="bg-white w-[325px] p-4 rounded-[28px] group border border-slate-100 hover:shadow-xl transition-all duration-300 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] cursor-pointer flex flex-col"
      onClick={() => onBookAppointment(doctor.id)}
    >
      <div className="relative h-[280px] rounded-[24px] overflow-hidden mb-5">
        <img
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={doctor.image}
          // onError={(e) => {
          //   const target = e.target as HTMLImageElement;
          //   target.src = "/icons/image.svg";
          // }}
        />
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-md text-[#0057b7] text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-sm">
          {hasDiscount ? `${discountPercent}% OFF` : "Top Rated"}
        </div>
      </div>

      <div className="flex flex-col flex-1 px-2">
        <div className="flex justify-between items-start mb-0.5">
          <h3 className="font-bold text-xl text-slate-800 tracking-tight">
            {doctor.name}
          </h3>
          <div className="flex items-center gap-1.5 text-[#0057b7]">
            <StarIcon className="size-4 text-[#0057b7] fill-[#0057b7]" />
            <span className="text-[13px] font-bold">{formattedRating}</span>
          </div>
        </div>

        <p className="text-slate-500 text-sm font-medium">
          {doctor.categories[0]?.name ?? "Specialist"}
        </p>

        <div className="w-full h-px bg-slate-100 my-5" />

        <div className="flex justify-between items-center text-[12px] font-bold text-slate-600 mb-6 px-1">
          <span className="flex items-center gap-1.5">15+ Yrs Exp.</span>
          <span className="flex items-center gap-1.5">
            Fee: ₹{payableAmount.toLocaleString()}
          </span>
        </div>

        <Button
          className="w-full rounded-2xl bg-slate-900 hover:bg-slate-800 text-white transition-all duration-300 h-14 font-bold text-base shadow-xl shadow-slate-200 group/btn"
          onClick={() => onBookAppointment(doctor.id)}
        >
          Book Appointment
          <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

type DoctorsListProps = {
  doctors: DoctorType[];
};

const DoctorsList = ({ doctors }: DoctorsListProps) => {
  const specializationList = useMemo(
    () =>
      Array.from(
        new Set(
          doctors.flatMap((doctor) => doctor.categories.map((cat) => cat.name)),
        ),
      ),
    [doctors],
  );

  const [activeSpecialization, setActiveSpecialization] = useState<
    string | undefined
  >(specializationList[0]);

  const filteredDoctorList = activeSpecialization
    ? doctors.filter((doctor) =>
        doctor.categories.some((cat) => cat.name === activeSpecialization),
      )
    : doctors;

  const router = useRouter();

  const handleBookAppointment = (doctorSlugId: string) => {
    router.push(`/doctor/${doctorSlugId}`);
  };

  useEffect(() => {
    setActiveSpecialization(specializationList[0]);
  }, [specializationList]);

  if (!doctors || doctors.length === 0) {
    return (
      <section
        id="doctors"
        className="flex flex-col items-center gap-6 justify-center mt-10 scroll-mt-28 rounded-2xl mx-2 py-5 "
      >
        <h2 className="text-2xl sm:text-5xl font-bold">Meet Our Top Doctors</h2>
        <p className="text-sm text-muted-foreground">
          No doctors available right now.
        </p>
      </section>
    );
  }

  return (
    <section
      id="doctors"
      className="flex w-full  flex-col items-center gap-6 justify-center mt-10 scroll-mt-28 rounded-2xl mx-2 py-5 px-4 sm:px-8"
    >
      {/* <h2 className="text-2xl sm:text-5xl font-bold">Meet Our Top Doctors</h2> */}
      <div className="flex flex-col items-center gap-6 justify-center w-full">
        <div className="text-center space-y-3 sticky top-16 z-10 lg:static bg-secondary/5 rounded-xl p-2 backdrop-blur-md border flex flex-col sm:flex-row items-center justify-between !w-full ">
          <div className="min-w-fit flex flex-col items-start px-2">
            <h4 className="text-2xl sm:text-3xl font-bold ">
              Our Specialized Team
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Top medical experts available at our various center
            </p>
          </div>
          <ul className="mb-4 flex space-x-4 overflow-x-auto max-w-full sm:max-w-[50vw] sticky top-16 z-10 lg:static px-2 scrollbar-hide">
            {specializationList.map((specialization, index) => (
              <Button
                variant={
                  activeSpecialization === specialization
                    ? "default"
                    : "outline"
                }
                key={index}
                onClick={() => setActiveSpecialization(specialization)}
                className="shadow-none sm:px-7 rounded-full"
              >
                {specialization}
              </Button>
            ))}
          </ul>
        </div>

        <AnimatePresence initial={true} mode="popLayout">
          <motion.div
            key={activeSpecialization}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            variants={{
              enter: { opacity: 0, y: -50, filter: "blur(4px)" },
              center: { opacity: 1, y: 0, filter: "blur(0px)" },
              exit: { opacity: 0, y: 50, filter: "blur(4px)" },
            }}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="mx-auto w-full flex flex-wrap justify-center gap-7 backdrop-blur-md">
              {filteredDoctorList.map((doctor, index) => (
                <DoctorCard
                  key={index}
                  doctor={doctor}
                  onBookAppointment={handleBookAppointment}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DoctorsList;
