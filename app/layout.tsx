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

// Per-tenant metadata is set in app/s/[storeId]/layout.tsx (the root layout has
// no storeId). This is only a neutral fallback for the not-found/coming-soon
// pages that render outside any tenant.
export const metadata: Metadata = {
  title: "Forumsquare",
};

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
