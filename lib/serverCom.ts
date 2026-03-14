"use server";
import { cookies } from "next/headers";

export const getCookieList = async () => {
  const cookieStore = await cookies();
  const cookieList = cookieStore.getAll().map((cookie) => ({
    name: cookie.name,
    value: cookie.value,
  }));
  return cookieList;
};


export const setCookie = async (name: string, token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3600 * 3, // 1 hour
  });
};

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
};

export const removeCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};
