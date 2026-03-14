import React from "react";
import BookingModal from "../components/Booking";
import DoctorsInfo from "../components/DoctorsInfo";
import { getDoctorByIdSSR } from "@/services/api/server";
import NoDataPage from "@/components/custom/NoDataPage";
import DoctorClientWrapper from "../components/DoctorClientWrapper";
import { Metadata } from "next";
import { getStoreInfoSSR } from "@/services/api/server";


interface DoctorPageProps {
  params: Promise<{
    docSlug: string;
  }>;
}

export async function generateMetadata({ params }: DoctorPageProps): Promise<Metadata> {
  const { docSlug } = await params;
  try {
    const doctorInfo = await getDoctorByIdSSR(docSlug);
    const store = await getStoreInfoSSR();
    if (!doctorInfo) return { title: "Doctor Not Found" };

    const categories = doctorInfo.categories.map(c => c.name).join(", ");
    return {
      title: `${doctorInfo.name} - ${categories} | ${store.name}`,
      description: doctorInfo.description.substring(0, 160),
    };
  } catch (error) {
    const store = await getStoreInfoSSR().catch(() => ({ name: "Hospital" }));
    return { title: `Doctor Profile | ${store.name}` };
  }
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { docSlug } = await params;

  try {
    const doctorInfo = await getDoctorByIdSSR(docSlug);

    if (!doctorInfo) {
      return <NoDataPage />;
    }

    return (
      <>
        {/* Pass data to client wrapper for state management like useBookingStore */}
        <DoctorClientWrapper doctorInfo={doctorInfo} />
        <section className="!-z-20 flex flex-col p-5 pt-24  gap-10 items-center justify-center max-w-screen-[1200px]   !scroll-mt-20 overflow-visible ">
          <div className="lg:flex justify-center gap-x-5 h-fit">
            <div className="mx-auto max-w-[900px] w-full flex-1 scroll-mt-0">
              <DoctorsInfo doctorInfo={doctorInfo} />
            </div>
            <BookingModal />
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching doctor in SSR:", error);
    return <NoDataPage />;
  }
}
