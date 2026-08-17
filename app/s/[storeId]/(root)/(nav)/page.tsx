import DoctorsList from "../components/DoctorsList";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import PreFooter from "../components/PreFooter";
import TestimonialList from "../components/TestimonialList";
import TreatmentsList from "../components/TreatmentList";
import {
  getDoctorsListSSR,
  getProceduresListSSR,
  getStoreInfoSSR,
  getTestimonialsSSR,
} from "@/services/api/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ storeId: string }>;
}): Promise<Metadata> {
  const { storeId } = await params;
  const store = await getStoreInfoSSR(storeId);
  return {
    title: `${store.name} - ${store.tagline}`,
    description: store.about ?? "",
  };
}


import LocationsSection from "@/components/custom/LocationsSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;
  const [doctorsResult, proceduresResult, testimonialsResult, storeResult] =
    await Promise.allSettled([
      getDoctorsListSSR(storeId),
      getProceduresListSSR(storeId),
      getTestimonialsSSR(storeId),
      getStoreInfoSSR(storeId),
    ]);

  const doctors =
    doctorsResult.status === "fulfilled" ? doctorsResult.value : [];
  const procedures =
    proceduresResult.status === "fulfilled" ? proceduresResult.value : [];
  const testimonials =
    testimonialsResult.status === "fulfilled" ? testimonialsResult.value : [];
  const store = storeResult.status === "fulfilled" ? storeResult.value : null;

  if (!store) {
    return null; // Or some error/loading state
  }

  return (
    <section className="min-h-screen w-full ">
      <Hero store={store} />
      <Gallery media={store.media} />
      <DoctorsList doctors={doctors} />
      <TreatmentsList procedures={procedures} />
      <TestimonialList testimonials={testimonials} />
      {/* <PreFooter store={store} /> */}
      {store.addressList && (
        <LocationsSection
          addresses={store.addressList}
          timings={store.timings}
        />
      )}
    </section>
  );
}
