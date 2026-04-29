import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import CustomToaster from "@/components/custom/CustomToaster";
import AppProvider from "@/lib/AppProvider";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

import { getStoreInfoSSR } from "@/services/api/server";

export async function generateMetadata(): Promise<Metadata> {
  const store = await getStoreInfoSSR();
  return {
    title: {
      default: `${store.name} - ${store.tagline}`,
      template: `%s | ${store.name}`,
    },
    description: store.about ?? "",
  };
}

// const manrope = Manrope({ subsets: ["latin"] });
// const quicksand = Quicksand({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

import { NotificationProvider } from "@/components/providers/NotificationProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth overflow-x-hidden">
      <body
        className={cn([
          nunito.className,
          "antialiased",
          "scroll-smooth",
          "overflow-x-hidden",
        ])}
      >
        <AppProvider>
          <NotificationProvider>
            {children}
            <CustomToaster />
          </NotificationProvider>
        </AppProvider>
      </body>
    </html>
  );
}
