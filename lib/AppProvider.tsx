"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getCookie } from "./serverCom";
import { apiInstance, isTerminalRequestError, setAccessToken } from "./utils";
import { apiEndpoints } from "@/constants/api";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // A 401/403/404 will never succeed on retry. The previous flat
            // `retry: 5` turned every one of them into six requests spread
            // over 7.5 seconds.
            retry: (failureCount, error) =>
              isTerminalRequestError(error) ? false : failureCount < 2,
            retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 15000),
            // Was `true` with the default staleTime of 0, so every tab focus
            // refetched every mounted query.
            refetchOnWindowFocus: false,
            // Treat data as fresh for a minute; remounting a component that
            // already has data no longer refires the request.
            staleTime: 60_000,
          },
        },
      })
  );

  useEffect(() => {
    const initToken = async () => {
      try {
        const refreshToken = await getCookie("refreshToken");
        if (refreshToken) {
          const response = await apiInstance.get(apiEndpoints.auth.accessToken, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          const { data: newToken } = response.data;
          setAccessToken(newToken);
        }
      } catch (error) {
        console.error("Failed to initialize token:", error);
      }
    };
    initToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  );
};

export default AppProvider;
