'use client';
import TestTreatmentCards from "../components/TreatmentCard";
import { useEffect, useState } from "react";
import { TransitionPanel } from "@/components/ui/transition-panel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Facilites from "../components/Facilities";

import { useGetCategoriesQuery } from "@/services/query/categoriesQuery";
import CustomLoading from "@/components/custom/CustomLoading";
import { useGetProceduresListQuery } from "@/services/query/procedureQuery";
import { useGetFacilitiesQuery } from "@/services/query/facilitiesQuery";
import { CategoryType, FacilityType, ProcedureType } from "@/models/schema";

interface SpecializationClientProps {
    initialCategories: CategoryType[];
    initialProcedures?: ProcedureType[];
    initialFacilities?: FacilityType[];
}

const SpecializationClient = ({ initialCategories, initialProcedures, initialFacilities }: SpecializationClientProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [categoryId, setCategoryId] = useState(
        initialCategories.length > 0
            ? (initialCategories[0].specializationId || initialCategories[0].id)
            : ""
    );

    const { data: categories } = useGetCategoriesQuery({
        initialData: initialCategories
    });

    const isFirstCategory = categories && categoryId === (categories[0].specializationId || categories[0].id);

    const { data: procedures, isPending: proceduresPending } = useGetProceduresListQuery(categoryId, {
        initialData: isFirstCategory ? initialProcedures : undefined
    });
    const { data: facilitiesList, isPending: facilitiesPending } = useGetFacilitiesQuery(categoryId, {
        initialData: isFirstCategory ? initialFacilities : undefined
    });


    const formattedProcedures = (procedures as ProcedureType[])?.map((proc) => ({
        id: proc.id,
        name: proc.name,
        image: proc.image,
        amount: proc.cost ? parseFloat(proc.cost) : undefined,
        discount: proc.discount ? parseFloat(proc.discount) : undefined,
        description: proc.description,
    })) || [];

    return (
        <section className=" rounded-2xl mt-14 space-y-7 mx-5 p-7 max-w-screen-lg sm:mx-auto">
            <h2 className="text-primary font-extrabold text-4xl">
                Our Specializations
            </h2>
            <div>
                <ul className="mb-4 flex space-x-4 overflow-scroll">
                    {categories?.map((item: CategoryType, index: number) => (
                        <Button
                            variant={activeIndex === index ? "default" : "outline"}
                            key={index}
                            onClick={() => {
                                setCategoryId(item.specializationId || item.id);
                                setActiveIndex(index);
                            }}
                            className="shadow-none px-7 rounded-full"
                        >
                            {item.name}
                        </Button>
                    ))}
                </ul>

                <div className="overflow-hidden border-t border-zinc-200 dark:border-zinc-700">
                    <TransitionPanel
                        activeIndex={activeIndex}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        variants={{
                            enter: { opacity: 0, y: -50, filter: "blur(4px)" },
                            center: { opacity: 1, y: 0, filter: "blur(0px)" },
                            exit: { opacity: 0, y: 50, filter: "blur(4px)" },
                        }}
                    >
                        {categories!.map((item: CategoryType, index: number) => (
                            <article key={index} className="py-5 ">
                                <h2 className="font-extrabold text-3xl font-sans">
                                    {item.name}
                                </h2>
                                <div className="flex gap-5 py-6 items-center flex-col md:flex-row">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={150}
                                        height={150}
                                        className="size-[200px]  sm:size-[250px] rounded-2xl bg-black/10"
                                    />
                                    <p className="text-sm font-sans italic text-muted-foreground leading-6 tracking-wide font-medium">
                                        {item.description}
                                    </p>
                                </div>
                                <h4 className="font-bold text-3xl mt-5">
                                    Procedures & Treatments
                                </h4>
                                {proceduresPending ? (
                                    <CustomLoading />
                                ) : (
                                    <TestTreatmentCards treatments={formattedProcedures} />
                                )}
                            </article>
                        ))}
                    </TransitionPanel>
                    <h4 className="font-bold text-3xl mt-10">
                        Facilities
                    </h4>
                    <p className="text-sm font-sans italic text-muted-foreground leading-6 tracking-wide font-medium pb-5 pt-1">
                        Explore various Facilities we provide.
                    </p>
                    {facilitiesPending ? (
                        <CustomLoading />
                    ) : (
                        <Facilites facilities={facilitiesList || []} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default SpecializationClient;
