'use client';
import TestTreatmentCards from "../components/TreatmentCard";
import { useEffect, useMemo, useRef, useState } from "react";
import { TransitionPanel } from "@/components/ui/transition-panel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Facilites from "../components/Facilities";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { useGetCategoriesQuery } from "@/services/query/categoriesQuery";
import CustomLoading from "@/components/custom/CustomLoading";
import { useGetProceduresListQuery } from "@/services/query/procedureQuery";
import { useGetFacilitiesQuery } from "@/services/query/facilitiesQuery";
import { CategoryType, FacilityType, ProcedureType } from "@/models/schema";
import { ChevronLeft, ChevronRight, Verified } from "lucide-react";

interface SpecializationClientProps {
    initialCategories: CategoryType[];
    initialProcedures?: ProcedureType[];
    initialFacilities?: FacilityType[];
}

const SpecializationClient = ({ initialCategories, initialProcedures, initialFacilities }: SpecializationClientProps) => {
    const { data: categories } = useGetCategoriesQuery({
        initialData: initialCategories
    });

    const sortedCategories = useMemo(() => {
        if (!categories) return [];
        return [...categories].sort((a, b) => a.name.localeCompare(b.name));
    }, [categories]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const scrollRef = useRef<HTMLUListElement>(null);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [sortedCategories]);
    const [categoryId, setCategoryId] = useState(() => {
        const initialSorted = [...initialCategories].sort((a, b) => a.name.localeCompare(b.name));
        return initialSorted.length > 0
            ? (initialSorted[0].specializationId || initialSorted[0].id)
            : "";
    });

    const isFirstCategory = activeIndex === 0 && categories && categories.length > 0;

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
        <section className=" rounded-2xl sm:mt-14 space-y-7 mx-0 sm:mx-5 px-6 sm:px-10 py-14 sm:mx-auto">
            <h2 className="text-primary font-extrabold text-3xl sm:text-4xl px-2">
                Our Specializations
            </h2>
            <div>
                <div className="relative group/nav">
                    {showLeftArrow && sortedCategories.length > 1 && (
                        <div className="absolute -left-6 top-0 bottom-1 w-12  z-20 flex items-center justify-start pointer-events-none transition-all duration-300">
                            <ChevronLeft className="h-5 w-5 text-primary animate-pulse ml-1" />
                        </div>
                    )}

                    <ul
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="mb-4 flex space-x-4 overflow-x-auto no-scrollbar scroll-smooth relative"
                    >
                        {sortedCategories.map((item: CategoryType, index: number) => (
                            <Button
                                variant={activeIndex === index ? "default" : "outline"}
                                key={index}
                                onClick={() => {
                                    setCategoryId(item.specializationId || item.id);
                                    setActiveIndex(index);
                                }}
                                className="shadow-none px-7 rounded-full shrink-0"
                            >
                                {item.name}
                            </Button>
                        ))}
                    </ul>

                    {showRightArrow && sortedCategories.length > 1 && (
                        <div className="absolute -right-6 top-0 bottom-1 w-12 z-20 flex items-center justify-end pointer-events-none transition-all duration-300">
                            <ChevronRight className="h-5 w-5 text-primary animate-pulse mr-1" />
                        </div>
                    )}
                </div>

                <div className="overflow-hidden border-t border-zinc-200 dark:border-zinc-700">
                    <TransitionPanel
                        activeIndex={activeIndex}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        variants={{
                            enter: { opacity: 0, x: 20, filter: "blur(4px)" },
                            center: { opacity: 1, x: 0, filter: "blur(0px)" },
                            exit: { opacity: 0, x: -20, filter: "blur(4px)" },
                        }}
                    >
                        {sortedCategories.map((item: CategoryType, index: number) => (
                            <article key={index} className="py-5">
                                {activeIndex === index && (
                                    <>
                                        <section className="max-w-screen-2xl mx-auto mb-10 sm:mb-24 relative z-10">
                                            <div className="grid grid-cols-1 lg:grid-cols-12 md:gap-12 gap-5 items-center">
                                                <div className="lg:col-span-7">
                                                    <div className="rounded-3xl overflow-hidden shadow-2xl relative group">
                                                        <Carousel opts={{ loop: true }} className="w-full">
                                                            <CarouselContent>
                                                                {(item.images && item.images.length > 0 ? item.images : [item.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"]).map((imgSrc: string, imgIdx: number) => (
                                                                    <CarouselItem key={imgIdx}>
                                                                        <img
                                                                            alt={`${item.name} - slide ${imgIdx + 1}`}
                                                                            className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                                                                            src={imgSrc}
                                                                            onError={(e) => {
                                                                                const target = e.target as HTMLImageElement;
                                                                                target.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200";
                                                                            }}
                                                                        />
                                                                    </CarouselItem>
                                                                ))}
                                                            </CarouselContent>
                                                            {(item.images?.length > 1) && (
                                                                <>
                                                                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 border-none bg-white/20 backdrop-blur-md hover:bg-white/40 text-white" />
                                                                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 border-none bg-white/20 backdrop-blur-md hover:bg-white/40 text-white" />
                                                                </>
                                                            )}
                                                        </Carousel>
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-5 sm:pr-8">
                                                    <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">Core Specialization</span>
                                                    <h2 className="text-4xl font-bold mb-6">{item.name}</h2>
                                                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                                        {item.description}
                                                    </p>
                                                    <div className="flex items-center gap-4 !text-blue-500 font-semibold">
                                                        <Verified className="h-5 w-5" />
                                                        <span>Board Certified Specialists</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <h4 className="font-bold text-3xl mt-5">
                                            Procedures & Treatments
                                        </h4>
                                        <p className="text-sm font-sans italic text-muted-foreground leading-6 tracking-wide font-medium pb-5 pt-1">
                                            Signature protocols curated for exceptional results.
                                        </p>
                                        {proceduresPending ? (
                                            <CustomLoading />
                                        ) : (
                                            <TestTreatmentCards treatments={formattedProcedures} />
                                        )}
                                    </>
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
