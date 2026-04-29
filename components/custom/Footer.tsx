"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AddressType, SocialMediaType } from "@/models/schema";
import { cn } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";

type FooterProps = {
  addresses: AddressType[];
  media: SocialMediaType;
  logo: string;
  title: string;
  timings?: { day: number; fromTime: string; toTime: string }[];
  email?: string | null;
  phoneNo?: string | null;
};

const TimingsInfo = ({ timings }: { timings?: { day: number; fromTime: string; toTime: string }[] }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formatTime = (timeString: string) => {
    // Assuming timeString could be an ISO string or similar, but the API may return it as ISO string
    // Since the database expects timestamps, let's extract HH:mm portion and convert
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch {
      return timeString;
    }
  };

  if (!timings || timings.length === 0) return null;

  // Group timings by day
  const timingsByDay = timings.reduce((acc, t) => {
    if (!acc[t.day]) acc[t.day] = [];
    acc[t.day].push(t);
    return acc;
  }, {} as Record<number, typeof timings>);

  return (
    <section className=" rounded-2xl max-w-xs mx-auto text-neutral-200  p-0.5 text-[13px] font-medium  ">
      <h4 className="text-center text-base">Timings</h4>
      <ul className="space-y-2">
        {days.map((day, index) => {
          const dayTimings = timingsByDay[index];
          if (!dayTimings || dayTimings.length === 0) return null;

          return (
            <li key={index}>
              <div className="px-6 flex gap-x-3 items-start justify-between my-3 text-gray-400 flex-col sm:flex-row">
                <p className="w-12 text-left">{day}</p>
                <div className="flex flex-col text-xs text-right">
                  <p>
                    {formatTime(dayTimings[0].fromTime)} - {formatTime(dayTimings[dayTimings.length - 1].toTime)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const Footer: FC<FooterProps> = ({ addresses, logo, media, title, timings, email, phoneNo }) => {
  const LinkComponent = ({ link, title }: { link: string; title: string }) => {
    return (
      <Link
        href={link}
        className="font-medium text-secondary/70 hover:text-secondary  hover:scale-105 duration-200  text-sm hover:font-bold "
      >
        {title}
      </Link>
    );
  };

  const SocialIcon = ({
    src,
    alt,
    href,
  }: {
    src: string;
    alt: string;
    href?: string;
  }) => {
    return !href ? (
      <></>
    ) : (
      <div className="size-9 flex items-center justify-center rounded-full bg-gray-700/20 backdrop-blur-sm transition-colors shadow-sm">
        <Link href={href}>
          <Image
            src={src}
            alt={alt}
            width={35}
            height={35}
            className="w-5 h-5 cursor-pointer hover:scale-110 duration-200"
          />
        </Link>
      </div>
    );
  };

  return (
    <footer
      id="contact-us"
      className="flex flex-col items-center justify-center text-neutral-600 bg-primary bg-[url('/background/footer.svg')] bg-cover !z-10"
    >
      <div className=" flex  flex-col gap-5 gap-y-10 justify-center items-center mx-auto py-10 px-8  md:flex-row md:justify-around md:items-start  md:gap-x-12  lg:gap-x-20 ">
        <div className="flex flex-col gap-6 lg:pr-8">
          {logo && (
            <div className="relative h-8 w-44">
              <Image src={logo} alt={title || "Logo"} fill className="object-contain object-left" />
            </div>
          )}
          <p className="text-[13px] leading-relaxed text-slate-500">
            Redefining health through the digital biome. The intersection of technology and human vitality.
          </p>
          <div className="flex gap-3 mt-1 items-center">
            {phoneNo && (
              <Link href={`tel:${phoneNo}`}>
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700/20 transition-colors test-white">
                  <Phone className="size-5" />
                </div>
              </Link>
            )}
            <SocialIcon href={media?.facebook} alt="Facebook" src="/icons/facebook.svg" />
            <SocialIcon href={media?.instagram} alt="Instagram" src="/icons/instagram.svg" />
            <SocialIcon href={media?.x} alt="X" src="/icons/twitter.svg" />
            <SocialIcon href={media?.linkedin} alt="LinkedIn" src="/icons/linkedin.svg" />
            <SocialIcon href={media?.whatsapp} alt="Whatsapp" src="/icons/whatsapp.svg" />
            <SocialIcon href={media?.youtube} alt="Youtube" src="/icons/youtube.svg" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
          <ul className="flex flex-col gap-y-4 items-center sm:items-start flex-1">
            <p className="font-bold text-secondary text-base uppercase tracking-wider mb-2">
              Quick Links
            </p>
            <LinkComponent link="/#doctors" title="Doctors" />
            <LinkComponent link="/specializations" title="Specializations" />
            <LinkComponent link="/reviews" title="Reviews" />
            <LinkComponent link="/account" title="Account" />
          </ul>
          <ul className="flex flex-col gap-y-4 items-center sm:items-start flex-1">
            <p className="font-bold text-secondary text-base uppercase tracking-wider mb-2">
              Contact us
            </p>
            <div className="text-secondary/70 text-sm flex flex-col items-center sm:items-start gap-y-3 font-medium">
              {email && (
                <Link href={`mailto:${email}`} className="hover:text-secondary hover:underline transition-all flex items-center gap-2">
                  <Mail className="size-4" /> {email}
                </Link>
              )}
              {phoneNo && (
                <Link href={`tel:${phoneNo}`} className="hover:text-secondary hover:underline transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">phone</span> {phoneNo}
                </Link>
              )}
            </div>
          </ul>
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start">
            <TimingsInfo timings={timings} />
          </div>
        </div>
      </div>
      <p className="mb-5 mt-2 text-center text-white/50 font-medium tracking-wide  text-sm">
        Copyright © 2024 Forumsquare Inc.
      </p>
    </footer>
  );
};

export default Footer;
