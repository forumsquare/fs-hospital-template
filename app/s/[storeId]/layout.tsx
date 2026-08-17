import type { Metadata } from "next";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { getStoreInfoSSR } from "@/services/api/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ storeId: string }>;
}): Promise<Metadata> {
  const { storeId } = await params;
  try {
    const store = await getStoreInfoSSR(storeId);
    return {
      title: {
        default: `${store.name} - ${store.tagline}`,
        template: `%s | ${store.name}`,
      },
      description: store.about ?? "",
    };
  } catch {
    return {};
  }
}

/**
 * Tenant root: makes the resolved storeId available to client components.
 * Per-tenant theming is injected here in a later step.
 */
export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;
  return <StoreProvider storeId={storeId}>{children}</StoreProvider>;
}
