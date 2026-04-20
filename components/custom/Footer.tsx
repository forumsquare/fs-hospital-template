"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AddressType, SocialMediaType } from "@/models/schema";
import { cn } from "@/lib/utils";
import { Mail, Share } from "lucide-react";

type FooterProps = {
  addresses: AddressType[];
  media: SocialMediaType;
  logo: string;
  title: string;
  timings?: { day: number; fromTime: string; toTime: string }[];
  email?: string | null;
  phoneNo?: string | null;
};

const Footer: FC<FooterProps> = ({ addresses, logo, media, title, timings, email, phoneNo }) => {
  const LinkComponent = ({ link, title }: { link: string; title: string }) => {
    return (
      <Link
        href={link}
        className="text-[13px] text-slate-500 font-medium hover:text-slate-900 transition-colors"
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
    return !href ? null : (
      <Link href={href}>
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors">
          <Image
            src={src}
            alt={alt}
            width={14}
            height={14}
            className="w-[14px] h-[14px] object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
      </Link>
    );
  };

  return (
    <footer
      id="contact-us"
      className="flex py-10 flex-col items-center justify-center text-neutral-600 bg-primary bg-[url('/background/footer.svg')] bg-cover !z-10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        {/* Column 1: Logo & Info */}
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
            {/* Added standard share icon to perfectly match reference aesthetics */}
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors text-slate-600">
              <Share />
            </button>
            <SocialIcon href={media?.facebook} alt="Facebook" src="/icons/facebook.svg" />
            <SocialIcon href={media?.instagram} alt="Instagram" src="/icons/instagram.svg" />
            <SocialIcon href={media?.twitter} alt="Twitter" src="/icons/twitter.svg" />
            <SocialIcon href={media?.linkedin} alt="LinkedIn" src="/icons/linkedin.svg" />
            {email && (
              <Link href={`mailto:${email}`}>
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors text-slate-600">
                  <Mail />
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Column 2: Explore */}
        <div className="flex flex-col gap-4">
          <h4 className="text-slate-800 text-sm font-bold mb-2">Explore</h4>
          <LinkComponent link="/#clinics" title="Clinics Near Me" />
          <LinkComponent link="/specializations" title="Treatments" />
          <LinkComponent link="/tech-stack" title="Tech Stack" />
          <LinkComponent link="/career" title="Career" />
        </div>

        {/* Column 3: Legal */}
        <div className="flex flex-col gap-4">
          <h4 className="text-slate-800 text-sm font-bold mb-2">Legal</h4>
          <LinkComponent link="/privacy" title="Privacy Policy" />
          <LinkComponent link="/terms" title="Terms of Service" />
          <LinkComponent link="/accessibility" title="Accessibility" />
          <LinkComponent link="/compliance" title="Compliance" />
        </div>

        {/* Column 4: Patient Support */}
        <div className="flex flex-col gap-4">
          <h4 className="text-slate-800 text-sm font-bold mb-2">Patient Support</h4>
          <LinkComponent link="/contact" title="Contact Us" />
          <LinkComponent link="/faqs" title="FAQs" />
          <LinkComponent link="/insurance" title="Insurance Portal" />
          <LinkComponent link="/emergency" title="Emergency Services" />
        </div>

      </div>
      <p className="mb-5 mt-2 text-center text-white/50 font-medium tracking-wide  text-sm">
        Copyright © 2024 Forumsquare Inc.
      </p>
    </footer>
  );
};

export default Footer;
