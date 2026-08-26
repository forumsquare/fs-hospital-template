import type { Metadata } from "next";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { getStoreInfoSSR } from "@/services/api/server";
import { themeCss } from "@/lib/theme";

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
 * Tenant root: seeds storeId for client components and injects the hospital's
 * branding as CSS variables. `display: contents` cascades the vars to the whole
 * subtree without adding a layout box. Unset tokens fall back to globals.css.
 */
export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  let theme: Awaited<ReturnType<typeof getStoreInfoSSR>>["theme"] = null;
  try {
    const store = await getStoreInfoSSR(storeId);
    theme = store.theme ?? null;
  } catch {
    // Fall back to the default theme if the store can't be fetched.
  }

  const css = themeCss(theme);

  return (
    <StoreProvider storeId={storeId}>
      {css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null}
      {children}
    </StoreProvider>
  );
}
