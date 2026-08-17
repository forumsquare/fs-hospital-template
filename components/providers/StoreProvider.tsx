"use client";

import { createContext, useContext } from "react";

type StoreContextValue = { storeId: string };

const StoreContext = createContext<StoreContextValue | null>(null);

/**
 * Seeds the resolved tenant's storeId for client components, replacing the old
 * hardcoded `storeId` constant. Wrapped once in the tenant layout.
 */
export function StoreProvider({
  storeId,
  children,
}: {
  storeId: string;
  children: React.ReactNode;
}) {
  return (
    <StoreContext.Provider value={{ storeId }}>
      {children}
    </StoreContext.Provider>
  );
}

/** Read the current tenant's storeId inside a client component. */
export function useStoreId(): string {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStoreId must be used within a StoreProvider");
  }
  return ctx.storeId;
}
