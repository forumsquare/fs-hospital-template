import { languageMap } from "@/constants/map";
import { DiscountType } from "@/models/enums";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import axios, { type AxiosError } from "axios";
import { apiEndpoints } from "@/constants/api";
import { getCookie, removeCookie } from "./serverCom";
import { auth } from "./firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getNextSevenDates = (startDate: Date) => {
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + i);
    dates.push(nextDate);
  }
  return dates;
};
export const getTimeSlots = ({
  start,
  end,
  duration,
}: {
  start: string;
  end: string;
  duration: number;
}) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const slotList: Date[] = [];

  let currentTime = new Date(startTime.getTime());
  while (currentTime <= endTime) {
    slotList.push(new Date(currentTime));
    currentTime.setHours(currentTime.getHours() + Math.floor(duration / 60));
    currentTime.setMinutes(currentTime.getMinutes() + (duration % 60));
  }
  return slotList;
};

export const formatTime = (time: Date): string => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = String(hours % 12 || 12).padStart(2, "0"); // Ensure hours are two digits
  const formattedMinutes = String(minutes).padStart(2, "0"); // Ensure minutes are two digits
  return `${formattedHours}:${formattedMinutes} ${ampm}`; // Return formatted time
};

export function formatAmount(amount: number, fraction?: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: fraction ?? 2,
  });
  return formatter.format(amount);
}

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
  const year = date.getFullYear(); // Get full year
  return `${day}-${month}-${year}`; // Return formatted date
};

export const getActualAmount = ({
  amount,
  discount,
  discountType = DiscountType.Amount,
}: {
  amount: number;
  discount: number;
  discountType?: DiscountType;
}) => {
  let actAmt = 0;
  if (discountType == DiscountType.Amount) {
    actAmt = amount - discount;
  } else if (discountType == DiscountType.Percent) {
    actAmt = amount - amount * (discount / 100);
  }

  return actAmt;
};

export function formatIndVal(amount: number): string {
  if (amount >= 10000) {
    return `${Math.floor(amount / 1000)}k`; // Format to 'k' for values >= 100,000
  } else {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Indian format for lower values
  }
}

export const getLangString = (lang: string[]): string => {
  if (lang.length == 0) return "";
  return lang.reduce((prev, current) => prev + "\t|\t" + current);
};

export const getOnlyDate = (date?: Date) => {
  const onlyDate = date ?? new Date();
  return new Date(onlyDate.setHours(0, 0, 0, 0));
};

export function stringToDateWithoutOffset(dateString: string): Date {
  // Parse the date string using dayjs
  const parsedDate = dayjs(dateString);

  // Create a new Date object using the parsed components
  return new Date(
    parsedDate.year(),
    parsedDate.month(),
    parsedDate.date(),
    parsedDate.hour(),
    parsedDate.minute(),
    parsedDate.second(),
    parsedDate.millisecond()
  );
}

export function dateToStringWithoutOffset(date: Date): string {
  // Use dayjs to parse the date
  const parsedDate = dayjs(date);

  // Format the date manually to maintain original format
  return parsedDate.format("YYYY-MM-DDTHH:mm:ss.SSS");
}

export const listConcat = (
  items: string[],
  { separator }: { separator: string } = { separator: "|" }
) => {
  return items.reduce((prev, curr) => prev + `\t${separator}\t` + curr);
};

export const qKey = (input: string | string[]): string[] => {
  const splitStrings = (str: string): string[] =>
    str.split("/").filter(Boolean);
  if (typeof input === "string") {
    return splitStrings(input);
  } else {
    return input.reduce(
      (acc: string[], item) => acc.concat(splitStrings(item)),
      []
    );
  }
};

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: "http://127.0.0.1:8787",
  timeout: 1 * 60 * 1000,
  timeoutErrorMessage:
    "Unable to connect to our servers. please check your internet connection",
});

type TokenCallback = (token: string) => void;
let tokenListeners: TokenCallback[] = [];

export const onTokenSet = (callback: TokenCallback) => {
  tokenListeners.push(callback);
  if (accessToken) {
    callback(accessToken);
  }
  return () => {
    tokenListeners = tokenListeners.filter((cb) => cb !== callback);
  };
};

export let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    tokenListeners.forEach((cb) => cb(token));
  }
};

apiInstance.interceptors.request.use(
  (config) => {
    console.log("hiiii>>>>>");
    // const accessToken = getToken("accessToken");
    console.log({ accessToken });
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      // config.headers.Upgrade = "websocket";
      // config.headers.Connection = "Upgrade";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log(error.response?.status);
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.skipAuthRefresh) {
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint with credentials to include HTTP-only cookies
        const refreshToken = await getCookie("refreshToken");
        if (!refreshToken) throw new Error("No refresh token found");
        const response = await apiInstance.get(apiEndpoints.auth.accessToken, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const { data: newToken } = response.data;

        // Store new access token
        // setCookie("accessToken", accessToken);
        setAccessToken(newToken);

        // Update Authorization header

        // Retry the original request
        return apiInstance(originalRequest);
      } catch (error) {
        // If refresh token fails, logout user
        // localStorage.removeItem("accessToken");
        auth.signOut();
        removeCookie("refreshToken");
        window.location.href = "/signup";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export const handleErr = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    const axiosError = e as AxiosError;
    const err = axiosError.response?.data;
    console.log("error message --> ", err);
    // Keep the API's error body (callers read `message`) but carry the HTTP
    // status alongside it. The API does not include `status` in every error
    // body, and React Query needs it to tell a retryable failure from a
    // hopeless one like 401.
    const base =
      typeof err === "object" && err !== null
        ? { ...(err as Record<string, unknown>) }
        : { message: err ?? axiosError.message };
    throw Object.assign(base, { httpStatus: axiosError.response?.status });
  }
  throw e;
};

/**
 * True for failures that will never succeed on retry — auth, permission and
 * not-found responses. Retrying these just multiplies the request count.
 */
export const isTerminalRequestError = (error: unknown): boolean => {
  const status = (error as { httpStatus?: number; status?: number } | null)
    ?.httpStatus ?? (error as { status?: number } | null)?.status;
  return typeof status === "number" && status >= 400 && status < 500;
};

export function toLocalISOString(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return (
    d.getFullYear().toString().padStart(4, "0") +
    "-" +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    d.getDate().toString().padStart(2, "0") +
    "T" +
    d.getHours().toString().padStart(2, "0") +
    ":" +
    d.getMinutes().toString().padStart(2, "0") +
    ":" +
    d.getSeconds().toString().padStart(2, "0") +
    ".000Z"
  );
}
