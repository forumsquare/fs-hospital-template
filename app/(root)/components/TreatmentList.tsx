"use client";
import TestTreatmentCards from "@/app/(root)/(nav)/specializations/components/TreatmentCard";
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
      <h2 className="text-2xl sm:text-4xl font-bold">
        Procedures and Treatments
      </h2>
      <p className="text-center text-sm font-sans italic text-primary/50 font-medium max-w-screen-md px-2">
        Explore a wide range of advanced procedures and treatments tailored to
        ensure your health and well-being. From preventive care to specialized
        interventions, our expert team is here to provide the best possible
        outcomes.
      </p>
      <Link
        href="/specializations"
        className=" flex items-center gap-1 px-5 text-primary  transition-all duration-200 hover:scale-110 active:scale-95 font-medium border p-2 rounded-xl border-primary !mt-8"
      >
        View All <ArrowRight className="size-4 animate-bounce-x" />
      </Link>
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
