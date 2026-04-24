import SpecializationClient from "./components/SpecializationClient";
import { getCategoriesSSR, getProceduresBySpecializationSSR, getFacilitiesBySpecializationSSR, getStoreInfoSSR } from "@/services/api/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const store = await getStoreInfoSSR();
  return {
    title: `Our Specializations | ${store.name}`,
    description: "Explore the various medical specializations and treatments we offer.",
  };
}


const SpecializationPage = async () => {
  try {
    const rawCategories = await getCategoriesSSR();
    const categories = (rawCategories || []).sort((a, b) => a.name.localeCompare(b.name));
    const firstCategoryId = categories?.[0]?.specializationId || categories?.[0]?.id;

    const [procedures, facilities] = await Promise.all([
      firstCategoryId ? getProceduresBySpecializationSSR(firstCategoryId) : Promise.resolve([]),
      firstCategoryId ? getFacilitiesBySpecializationSSR(firstCategoryId) : Promise.resolve([]),
    ]);

    return (
      <SpecializationClient
        initialCategories={categories || []}
        initialProcedures={procedures || []}
        initialFacilities={facilities || []}
      />
    );
  } catch (error) {
    console.error("Error in SpecializationPage SSR:", error);
    return <SpecializationClient initialCategories={[]} initialProcedures={[]} initialFacilities={[]} />;
  }
};

export default SpecializationPage;

