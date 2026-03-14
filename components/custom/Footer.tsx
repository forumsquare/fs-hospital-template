"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AddressType, SocialMediaType } from "@/models/schema";
import { cn } from "@/lib/utils";

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
                  {dayTimings.map((t, idx) => (
                    <p key={idx}>{formatTime(t.fromTime)} - {formatTime(t.toTime)}</p>
                  ))}
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
      <Link href={href}>
        <Image
          src={src}
          alt={alt}
          width={25}
          height={25}
          className="w-6 h-6 cursor-pointer hover:scale-125 duration-250 my-[2px] !text-primary  "
        />
      </Link>
    );
  };

  return (
    <footer
      id="contact-us"
      className="flex flex-col items-center justify-center text-neutral-600 bg-primary bg-[url('/background/footer.svg')] bg-cover !z-10"
    >
      <div className=" flex  flex-col gap-5 gap-y-10 justify-center items-center mx-auto py-10 px-8  md:flex-row md:justify-around md:items-start  md:gap-x-12  lg:gap-x-20 ">
        <div>
          <Image src={logo} alt={title} width={300} height={300} />
          {/* <span className='font-bold py-3'>{title}</span> */}
        </div>
        <div className="flex flex-col gap-y-6 flex-1">
          {addresses.map((address, idx) => (
            <div key={idx} className="flex flex-col gap-y-2 text-sm font-medium w-60 md:w-80 text-white/70">
              <p className="leading-relaxed">
                {address.address}, {address.area}, {address.city}, {address.state}, {address.country} - {address.zipcode}
              </p>
              <div className="space-y-1 text-xs opacity-80">
                <p>{address.contactMail ?? (address as any).email}</p>
                <ul className="space-y-1">
                  {address.contactNo ? (
                    <li>+91 {address.contactNo}</li>
                  ) : (
                    (address as any).phone?.map((phone: string) => (
                      <li key={phone}>+91 {phone}</li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-10 w-full justify-between ">
          <ul className="flex flex-col gap-y-3 items-center flex-1">
            <p className="font-semibold text-secondary/80 text-base">
              Quick Links
            </p>
            <LinkComponent link="/#doctors" title="Doctors" />
            <LinkComponent link="/specializations" title="Specializations" />
            <LinkComponent link="/#diagnostics" title="Diagnostics" />
            <LinkComponent link="/reviews" title="Reviews" />
            <LinkComponent link="/career" title="Career" />
          </ul>
          <ul className="flex flex-col gap-y-3 items-center flex-1 ">
            <p className="font-semibold text-secondary/80 text-base ">
              Contact us
            </p>
            <div className="text-secondary/70 text-sm flex flex-col items-center gap-y-2">
              {email && <Link href={`mailto:${email}`} className="hover:text-secondary hover:underline transition-all">{email}</Link>}
              {phoneNo && <Link href={`tel:${phoneNo}`} className="hover:text-secondary hover:underline transition-all">{phoneNo}</Link>}
            </div>
            <div className="flex gap-x-4 mt-2">
              <SocialIcon
                href={media.facebook}
                alt="Facebook"
                src="/icons/facebook.svg"
              />
              <SocialIcon
                href={media.instagram}
                alt="Instagram"
                src="/icons/instagram.svg"
              />
              <SocialIcon
                href={media.twitter}
                alt="Twitter"
                src="/icons/twitter.svg"
              />
              <SocialIcon
                href={media.youtube}
                alt="Youtube"
                src="/icons/youtube.svg"
              />
            </div>
          </ul>
          <TimingsInfo timings={timings} />
        </div>
      </div>
      <p className="mb-5 mt-2 text-center text-white/50 font-medium tracking-wide  text-sm">
        Copyright © 2024 Forumsquare Inc.
      </p>
    </footer>
  );
};

export default Footer;
