import SpecializationClient from "./components/SpecializationClient";
import { getCategoriesSSR, getProceduresBySpecializationSSR, getFacilitiesBySpecializationSSR, getStoreInfoSSR, getDoctorsListSSR } from "@/services/api/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ storeId: string }>;
}): Promise<Metadata> {
  const { storeId } = await params;
  const store = await getStoreInfoSSR(storeId);
  return {
    title: `Our Specializations | ${store.name}`,
    description: "Explore the various medical specializations and treatments we offer.",
  };
}


const SpecializationPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  try {
    const { storeId } = await params;
    const rawCategories = await getCategoriesSSR(storeId);
    const categories = (rawCategories || []).sort((a, b) => a.name.localeCompare(b.name));
    const firstCategoryId = categories?.[0]?.specializationId || categories?.[0]?.id;

    const [procedures, facilities, doctors] = await Promise.all([
      firstCategoryId ? getProceduresBySpecializationSSR(storeId, firstCategoryId) : Promise.resolve([]),
      firstCategoryId ? getFacilitiesBySpecializationSSR(storeId, firstCategoryId) : Promise.resolve([]),
      getDoctorsListSSR(storeId).catch(() => []),
    ]);

    return (
      <SpecializationClient
        initialCategories={categories || []}
        initialProcedures={procedures || []}
        initialFacilities={facilities || []}
        initialDoctors={doctors || []}
      />
    );
  } catch (error) {
    console.error("Error in SpecializationPage SSR:", error);
    return <SpecializationClient initialCategories={[]} initialProcedures={[]} initialFacilities={[]} initialDoctors={[]} />;
  }
};

export default SpecializationPage;

