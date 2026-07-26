"use client";

import { useQuery } from "@tanstack/react-query";
import { getCookie } from "@/lib/serverCom";
import { UserType } from "@/models/schema";

export const SESSION_QUERY_KEY = ["session"] as const;

/**
 * Single source of truth for "is somebody signed in".
 *
 * `getCookie` is a server action, so every component that read the cookie for
 * itself cost a separate round trip on mount. Routing it through one shared
 * query collapses those into a single read, and gives every auth-gated query a
 * consistent flag to put in `enabled` — without which they fire while logged
 * out and 401.
 */
export const useSession = () => {
  const { data, isPending } = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async (): Promise<UserType | null> => {
      const raw = await getCookie("userInfo");
      if (!raw) return null;
      try {
        return JSON.parse(raw) as UserType;
      } catch {
        return null;
      }
    },
    // The cookie only changes on sign-in/sign-out, and both invalidate this key.
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    user: data ?? null,
    isLoggedIn: !!data,
    isSessionLoading: isPending,
  };
};
