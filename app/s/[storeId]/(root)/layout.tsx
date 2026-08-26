import ChatBot from "@/components/custom/ChatBot";
import Footer from "@/components/custom/Footer";
import { addressVal, socialVal } from "@/constants/response";
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
    <section className="relative flex min-h-screen flex-col">
      {/* Background container with absolute positioning */}
      <div className="absolute inset-0 -z-10 -top-10">
        <div
          className="h-full bg-[url('/background/hospital-bg.jpg')] bg-repeat opacity-10"
          style={{ backgroundSize: "250px" }}
        />
      </div>
      {/* flex-1 pushes the footer to the bottom of the screen even when a page's
          content is short (e.g. loading / empty states). */}
      <div className="flex-1">{children}</div>
      <ChatBot />
      <Footer
        addresses={(store.addressList && store.addressList.length > 0) ? store.addressList : [addressVal]}
        logo={store.logo ?? ""}
        media={store.socialMedia ?? socialVal}
        title={store.name}
        timings={store.timings}
        email={store.email}
        phoneNo={store.phoneNo}
      />
    </section>
  );
}
