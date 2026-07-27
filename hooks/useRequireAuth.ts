"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "./useSession";

/**
 * Guard for client pages that require a signed-in user.
 *
 * Auth-gated data hooks are `enabled: isLoggedIn`, which leaves them stuck in
 * the `pending` state while logged out — so a protected page would otherwise
 * spin forever with nothing to show. This redirects logged-out visitors to the
 * login screen (preserving where they were headed) and tells the page when it's
 * safe to render.
 *
 * Usage:
 *   const { isAuthed } = useRequireAuth();
 *   if (!isAuthed || isPending) return <CustomLoading />;
 */
export const useRequireAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, isSessionLoading } = useSession();

  useEffect(() => {
    if (!isSessionLoading && !isLoggedIn) {
      router.replace(`/signup?redirect=${pathname}`);
    }
  }, [isSessionLoading, isLoggedIn, pathname, router]);

  return {
    isLoggedIn,
    isSessionLoading,
    // True only once the session has resolved AND the user is signed in, i.e.
    // it is safe to render the protected content.
    isAuthed: !isSessionLoading && isLoggedIn,
  };
};
