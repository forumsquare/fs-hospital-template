"use client";
import TestTreatmentCards from "../(nav)/specializations/components/TreatmentCard";
import { ProcedureType } from "@/models/schema";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Define the treatment schema

type TreatmentsListProps = {
  procedures: ProcedureType[];
};

const TreatmentsList = ({ procedures }: TreatmentsListProps) => {
  const formattedProcedures =
    procedures?.map((proc) => ({
      id: proc.id,
      name: proc.name,
      image: proc.image,
      amount: proc.cost ? parseFloat(proc.cost) : undefined,
      discount: proc.discount ? parseFloat(proc.discount) : undefined,
      duration: proc.duration,
      description: proc.description,
    })) || [];

  return (
    <section
      className="py-6 space-y-1 flex flex-col items-center relative bg-transparent "
    // style={{
    //   opacity: ,
    // }}
    >
      {/* <div className="absolute inset-0 -z-10  bg-[url('/background/bg2.svg')]  bg-no-repeat bg-cover" /> */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full px-6 sm:px-12 gap-6 sm:gap-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
            Procedures and Treatments
          </h2>
          <p className="text-sm font-sans italic text-slate-500 font-medium leading-relaxed">
            Explore a wide range of advanced procedures and treatments tailored to
            ensure your health and well-being. From preventive care to specialized
            interventions, our expert team is here to provide the best possible
            outcomes.
          </p>
        </div>
        <Link
          href="/specializations"
          className="flex-shrink-0 flex items-center gap-2 px-6 py-2.5 text-[#0057b7] transition-all duration-300 hover:bg-[#0057b7] hover:text-white font-bold border-2 rounded-2xl border-[#0057b7]/20 hover:border-[#0057b7]"
        >
          View All <ArrowRight className="size-4" />
        </Link>
      </div>
      {formattedProcedures.length === 0 ? (
        <p className="text-sm text-muted-foreground mt-6">
          No procedures available right now.
        </p>
      ) : (
        <TestTreatmentCards
          showHorizontal={true}
          treatments={formattedProcedures.slice(0, 3)}
        />
      )}
    </section>
  );
};

export default TreatmentsList;

