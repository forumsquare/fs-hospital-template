"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getCookie } from "./serverCom";
import { apiInstance, setAccessToken } from "./utils";
import { apiEndpoints } from "@/constants/api";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 5,
            retryDelay: 1500,
            refetchOnWindowFocus: true,
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
