import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming soon",
  robots: { index: false, follow: false },
};

export default function ComingSoon() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Coming soon</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        This site isn&apos;t published yet. Please check back shortly.
      </p>
    </div>
  );
}
