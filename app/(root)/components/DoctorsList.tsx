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
  return (
    <Card className="max-w-[310px] bg-white rounded-2xl overflow-hidden  transition-all duration-500 border border-gray-200 ">
      {/* Header Section */}
      <div className="relative bg-secondary text-primary">
        <div className="relative p-5 flex items-center gap-6">
          {/* Doctor Image */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-white/50 shadow-lg transform transition-transform duration-500 group-hover:scale-105">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
            {/* TODO: Check availability from backend */}

            {/* <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[var(--green)] text-white p-1  text-[9px] font-medium border-0 shadow-lg whitespace-nowrap">
              <span className="animate-pulse">Available Now</span>
            </Badge> */}
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold flex items-center gap-2">
              {doctor.name}
            </h3>
            <p className="text-muted-foreground font-medium ">
              {doctor.categories[0]?.name ?? "Specialist"}
            </p>
            {/* <p className="text-muted-foreground font-medium text-[11px] whitespace-nowrap ">
              Booking Accuracy :{" "}
              <span className="font-bold">{doctor.accuracy}%</span>
            </p> */}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 px-3 space-y-4">
        {/* Stats Grid */}
        <div className="flex items-center justify-center gap-3">
          {/* Rating */}
          <div className="text-center p-2 py-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50 transition-all duration-300 group cursor-pointer w-full">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <Star
                className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
              />
              <span className="text-lg font-bold">{doctor.rating}</span>
            </div>
            <p className="text-xs text-gray-600">
              {doctor.ratingCount} Reviews
            </p>
          </div>

          {/* Experience */}
          <div className="text-center p-2 py-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition-all duration-300 group cursor-pointer w-full">
            <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
              <Clock className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-bold">15+</span>
            </div>
            <p className="text-xs text-gray-600">Years Exp.</p>
          </div>

          {/* Patients */}
          {/* <div className="text-center p-2 py-3 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 hover:from-green-100 hover:to-green-200/50 transition-all duration-300 group cursor-pointer">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <Calendar className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-bold">1.2k+</span>
            </div>
            <p className="text-xs text-gray-600">Patients</p>
          </div> */}
        </div>

        {/* Booking Section */}
        <div className="bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 rounded-xl p-5">
          <div className="flex flex-col  items-center justify-between gap-4">
            <div className="flex  justify-between w-full items-center">
              <p className="text-sm text-gray-500 mb-1">Consulting Fee :</p>
              <p className="font-medium ">
                <span className="line-through mr-2 text-sm text-gray-500 ">
                  ₹{doctor?.fee?.toLocaleString()}
                </span>
                <span className=" font-semibold text-green-600">
                  ₹{payableAmount.toLocaleString()}
                </span>
              </p>
            </div>
            <Button
              variant={"outline"}
              className="w-full rounded-full border-2 border-muted-foreground hover:scale-105 transition-all duration-300 active:scale-95 text-base font-bold py-5 "
              onClick={() => onBookAppointment(doctor.id)}
            >
              Book Appointment
              <ChevronRight className="h-4 w-4 animate-bounce-x" />
            </Button>
          </div>
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
