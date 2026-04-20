import Image from "next/image";
import Link from "next/link";
import { StoreInfoType } from "@/models/schema";

const PreFooter = ({ store }: { store: StoreInfoType }) => {
  const certificates = store.media?.filter(m => m.type === "CERTIFICATE") || [];
  const address = store.addressList?.[0];
  const query = address ? `${address.lat},${address.lng}` : "Hospital";

  return (
    <div className="w-full py-6  backdrop-blur-sm">
      <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center justify-around">
        {/* Certifications Section */}
        <div className="flex gap-4">
          <div className="flex gap-4 flex-wrap">
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <Link
                  key={cert.url}
                  href={cert.url}
                  target="_blank"
                  className="hover:opacity-80"
                >
                  <Image
                    src={cert.url}
                    alt="Certification"
                    width={100}
                    height={50}
                    className="object-contain"
                  />
                </Link>
              ))
            ) : (
              [1, 2].map((i) => (
                <Link
                  key={i}
                  href="/background/certificate.svg"
                  target="_blank"
                  className="hover:opacity-80"
                >
                  <Image
                    src="/background/certificate.svg"
                    alt={`Certification ${i}`}
                    width={100}
                    height={50}
                    className="object-contain"
                  />
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Google Maps Section */}
        {/* <div className="flex flex-col gap-4 items-center">
          <h4 className="text-2xl font-bold">Our Location</h4>
          <div className="h-[80vw] w-[80vw] md:h-[30vw] md:w-[30vw] lg:w-[25vw] lg:h-[25vw] border-2 border-gray-200 rounded-2xl overflow-hidden">
            <iframe
              style={{ height: "100%", width: "100%", border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"}`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PreFooter;
