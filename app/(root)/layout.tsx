import ChatBot from "@/components/custom/ChatBot";
import Footer from "@/components/custom/Footer";
import { addressVal, socialVal } from "@/constants/response";
import { getStoreInfoSSR } from "@/services/api/server";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await getStoreInfoSSR();
  return (
    <section className="relative">
      {/* Background container with absolute positioning */}
      <div className="absolute inset-0 -z-10 -top-10">
        <div
          className="h-full bg-[url('/background/hospital-bg.jpg')] bg-repeat opacity-10"
          style={{ backgroundSize: "250px" }}
        />
      </div>
      {children}
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
