import NavBar from "@/components/custom/NavBar";
import { getStoreInfoSSR } from "@/services/api/server";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await getStoreInfoSSR();
  return (
    <>
      <NavBar logo={store.logo ?? ""} name={store.name} />
      <main className="">{children}</main>
    </>
  );
}
