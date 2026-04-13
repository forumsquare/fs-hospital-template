"use client";
import { Button } from "@/components/ui/button";
import { DoctorType } from "@/models/schema";
import { Card } from "@/components/ui/card";
import { Star, Clock, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
const DoctorCard = ({
  doctor,
  onBookAppointment,
}: {
  doctor: DoctorType;
  onBookAppointment: (doctorId: string) => void;
}) => {
  const fee = parseFloat(doctor.fee);
  const discountPercent = parseFloat(doctor.discountAmt);
  const payableAmount = fee - (fee * discountPercent) / 100;
  const formattedRating = parseFloat(doctor.rating || "0").toFixed(1);
  const hasDiscount = discountPercent > 0;

  return (
    <Card className="max-w-[325px] bg-white rounded-[2rem] overflow-hidden transition-all duration-500 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 group relative">
      <div className="relative p-6 flex flex-col gap-6">
        {/* Top Section: Photo & Info */}
        <div className="flex gap-5 items-start">
          <div className="relative shrink-0">
            <div className="size-24 rounded-2xl overflow-hidden ring-4 ring-slate-50 shadow-xl transition-transform duration-700 group-hover:scale-105">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 size-5 rounded-full border-4 border-white shadow-lg" />
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-xl font-bold text-slate-900 leading-tight truncate">
              {doctor.name}
            </h3>
            <p className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-wider">
              {doctor.categories[0]?.name ?? "Specialist"}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 rounded-full mt-3">
              <span className="text-[10px] font-black text-emerald-600 uppercase">Top Rated</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100/50 transition-all duration-300 hover:bg-indigo-50">
            <div className="flex items-center gap-1.5 text-indigo-600 mb-0.5">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-lg font-black text-slate-900">{formattedRating}</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              {doctor.ratingCount} Reviews
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50/50 border border-amber-100/50 transition-all duration-300 hover:bg-amber-50">
            <div className="flex items-center gap-1.5 text-amber-500 mb-0.5">
              <Clock className="h-4 w-4" />
              <span className="text-lg font-black text-slate-900">15+</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Years Exp.</p>
          </div>
        </div>

        {/* Bottom Section: CTA & Fee */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Consulting Fee</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  ₹{payableAmount.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{fee.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            {hasDiscount && (
              <div className="h-fit px-2 py-1 bg-rose-500 rounded-lg shadow-lg shadow-rose-200">
                <span className="text-[10px] font-black text-white">-{discountPercent}%</span>
              </div>
            )}
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
    </Card>
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
          doctors.flatMap((doctor) =>
            doctor.categories.map((cat) => cat.name)
          )
        )
      ),
    [doctors]
  );

  const [activeSpecialization, setActiveSpecialization] = useState<
    string | undefined
  >(specializationList[0]);

  const filteredDoctorList = activeSpecialization
    ? doctors.filter((doctor) =>
      doctor.categories.some((cat) => cat.name === activeSpecialization)
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
      className="flex flex-col items-center gap-6 justify-center mt-10 scroll-mt-28 rounded-2xl mx-2 py-5 "
    >
      <h2 className="text-2xl sm:text-5xl font-bold">Meet Our Top Doctors</h2>
      <div className="flex flex-col items-center gap-6 justify-center">
        <div className="text-center space-y-3 sticky top-16 z-10 lg:static bg-secondary/5 rounded-xl p-2 backdrop-blur-md border">
          <h4 className="text-xl font-bold">Specializations</h4>
          <ul className="mb-4 flex space-x-4 overflow-x-auto max-w-[85vw]  sticky top-16 z-10 lg:static ">
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
            <div className="overflow-hidden flex flex-wrap gap-7 justify-center border-none backdrop-blur-md">
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
