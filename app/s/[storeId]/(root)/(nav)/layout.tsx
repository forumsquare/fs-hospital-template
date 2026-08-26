import NavBar from "@/components/custom/NavBar";
import { getStoreInfoSSR } from "@/services/api/server";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ storeId: string }>;
}>) {
  const { storeId } = await params;
  const store = await getStoreInfoSSR(storeId);
  return (
    <>
      <NavBar logo={store.logo ?? ""} name={store.name} />
      <main className="">{children}</main>
    </>
  );
}
