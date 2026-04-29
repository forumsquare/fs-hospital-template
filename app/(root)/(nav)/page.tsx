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

export async function generateMetadata(): Promise<Metadata> {
  const store = await getStoreInfoSSR();
  return {
    title: `${store.name} - ${store.tagline}`,
    description: store.about ?? "",
  };
}


import LocationsSection from "@/components/custom/LocationsSection";

export default async function HomePage() {
  const [doctorsResult, proceduresResult, testimonialsResult, storeResult] =
    await Promise.allSettled([
      getDoctorsListSSR(),
      getProceduresListSSR(),
      getTestimonialsSSR(),
      getStoreInfoSSR(),
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
      {store.addressList && <LocationsSection addresses={store.addressList} />}
    </section>
  );
}
