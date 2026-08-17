import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site not found",
  robots: { index: false, follow: false },
};

export default function SiteNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Site not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        There&apos;s no site at this address. If you own it, check your domain
        settings in the dashboard.
      </p>
    </div>
  );
}
