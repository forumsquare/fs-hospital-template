import Link from "next/link";
import React from "react";
import {
  ArrowLeft,
  ScrollText,
  ShieldCheck,
  Mail,
  CalendarClock,
} from "lucide-react";

const LAST_UPDATED = "02 February 2026";

// Body only — the document title / "last updated" live in the styled card header
// below, so the leading heading is intentionally omitted from this HTML.
const termsHtml = `
  <p>These Terms and Conditions (“Terms”) govern the access to and use of the Forumsquare platform, including its website, applications, and related services (“Platform”), operated by Gudivada Venkata Adi Sekhar (HUF), operating under the trade name “FORUMSQUARE”, having its address at House no 2-117-31/648, Plot no-31, West Maruti Nagar, Boduppal, Hyderabad – 500092 (“Forumsquare”, “We”, “Us”, “Our”).</p>
  <p>These Terms apply to both Users (patients and visitors) and Vendors (hospitals, clinics, doctors, diagnostic centers and healthcare providers) accessing or using the Platform, including vendor-powered websites.</p>
  <h3>1. Nature of Services</h3>
  <p>Forumsquare is a technology platform that facilitates interaction between Users and Vendors. Forumsquare does not provide medical advice, diagnosis, or treatment. All medical services, content, opinions, blogs, and advice displayed on vendor websites or profiles are provided solely by the respective Vendors.</p>
  <h3>2. Appointments & Bookings</h3>
  <p>Appointment availability, confirmation, cancellation, rescheduling, and consultation delivery are controlled entirely by the Vendor. Forumsquare does not guarantee appointments, availability, or medical outcomes and shall not be responsible for delays, no-shows, or disputes.</p>
  <h3>3. Payments & Fees</h3>
  <p>Payments on the Platform may occur in two ways:<br/>a) Vendor to Forumsquare: Vendors may be required to pay subscription or platform usage fees to Forumsquare as per selected packages.<br/>b) User to Vendor: Users may pay Vendors directly for consultations or healthcare services.<br/><br/>Forumsquare may integrate third-party payment gateways to facilitate payments. Forumsquare acts only as a technology facilitator and does not control, hold, or guarantee healthcare service delivery.</p>
  <h3>4. Refunds & Cancellations</h3>
  <p>Forumsquare does not determine or process medical refunds. Refunds, cancellations, and rescheduling policies are defined and managed solely by Vendors. Forumsquare shall not be liable for refund-related disputes.</p>
  <h3>5. Vendor Responsibilities & Indemnity</h3>
  <p>Vendors are solely responsible for compliance with applicable medical laws, licenses, and regulations. Vendors agree to indemnify and hold harmless Forumsquare against claims, losses, liabilities, or damages arising from medical services, advice, content, or regulatory non-compliance.</p>
  <h3>6. User Responsibilities</h3>
  <p>Users agree to provide accurate information and use the Platform lawfully. Users acknowledge that medical decisions and outcomes are between the User and Vendor only.</p>
  <h3>7. Limitation of Liability</h3>
  <p>Forumsquare shall not be liable for indirect, incidental, consequential, or special damages arising from use of the Platform, including medical outcomes, data loss, or service interruptions.</p>
  <h3>8. Governing Law & Jurisdiction</h3>
  <p>These Terms shall be governed by the laws of India. Courts in Hyderabad shall have exclusive jurisdiction.</p>
`;

const privacyHtml = `
  <p>This Privacy Policy describes how Forumsquare collects, uses, stores, and protects personal information of Users and Vendors in accordance with applicable Indian laws, including the Digital Personal Data Protection Act, 2023.</p>
  <h3>1. Information Collected</h3>
  <p><strong>Users:</strong><br/>- Name, phone number, email address<br/>- Appointment details and booking history<br/>- Medical records, reports, and prescriptions<br/>- Chats, messages, and reviews<br/><br/><strong>Vendors:</strong><br/>- Clinic and hospital details<br/>- Doctor profiles and availability<br/>- Booking data and analytics</p>
  <h3>2. Use of Information</h3>
  <p>Information is used to facilitate appointments, enable communication, store records, improve services, send notifications, and comply with legal obligations.</p>
  <h3>3. Medical Records</h3>
  <p>Medical records are stored securely and made accessible to Users and authorized Vendors. Forumsquare does not interpret or provide medical opinions based on such records.</p>
  <h3>4. Communications</h3>
  <p>Forumsquare may communicate with Users and Vendors via SMS, WhatsApp, email, and push notifications for transactional, service-related, and platform-related purposes.</p>
  <h3>5. Third-Party Services</h3>
  <p>Forumsquare uses third-party service providers for hosting, messaging, analytics, and payment processing. Data shared is limited to what is necessary for service delivery.</p>
  <h3>6. Data Retention & Deletion</h3>
  <p>Personal data is retained only as long as required for service delivery or legal compliance. Users may request account deletion or data removal subject to legal obligations.</p>
  <h3>7. Children’s Data</h3>
  <p>The Platform is not intended for use by minors without parental or guardian consent. Any data of minors is processed only for healthcare purposes under applicable laws.</p>
  <h3>8. Data Security</h3>
  <p>Forumsquare implements reasonable technical and organizational measures to protect personal data; however, no system is completely secure.</p>
  <h3>9. Grievance Redressal</h3>
  <p>Grievance Officer<br/>Forumsquare<br/>Email: support@forumsquare.in</p>
  <h3>10. Policy Updates</h3>
  <p>Forumsquare reserves the right to update these Terms and Privacy Policy from time to time. Updated versions will be published on the Platform.</p>
`;

const PolicyCard = ({
  icon: Icon,
  title,
  subtitle,
  html,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  html: string;
}) => (
  <article className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)]">
    <header className="flex items-center gap-4 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-6 py-5 sm:px-8">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="text-xs font-medium text-slate-500">{subtitle}</p>
      </div>
    </header>
    <div
      className="px-6 py-6 text-slate-600 sm:px-8 sm:py-8
        [&>p:first-child]:text-[15px] [&>p:first-child]:leading-7 [&>p:first-child]:text-slate-700
        [&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-[15px] [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-slate-900 [&_h3]:first:mt-0
        [&_p]:mb-4 [&_p]:text-sm [&_p]:leading-7
        [&_strong]:font-semibold [&_strong]:text-slate-900"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </article>
);

const page = () => {
  return (
    <section className="relative">
      {/* Hero */}
      <div className="border-b border-slate-200/70 bg-gradient-to-b from-primary/5 via-primary/[0.015] to-transparent">
        <div className="mx-auto flex max-w-screen-md flex-col items-center px-4 pb-6 pt-5 text-center sm:pb-7 sm:pt-6">
          <div className="mb-4 flex w-full items-center">
            <Link
              href="/account"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to account
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
              <ScrollText className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Terms &amp; Privacy
            </h1>
          </div>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            The policies below govern your use of the Forumsquare platform.
          </p>

          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
            <CalendarClock className="h-3.5 w-3.5" />
            Last updated: {LAST_UPDATED}
          </span>
        </div>
      </div>

      {/* Documents */}
      <div className="mx-auto max-w-screen-md space-y-6 px-4 py-8">
        <PolicyCard
          icon={ScrollText}
          title="Terms & Conditions"
          subtitle="Your agreement with Forumsquare"
          html={termsHtml}
        />
        <PolicyCard
          icon={ShieldCheck}
          title="Privacy Policy"
          subtitle="How your data is collected & protected"
          html={privacyHtml}
        />

        {/* Support footer */}
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-slate-200/80 bg-slate-50/60 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Questions about these policies?
            </p>
            <p className="text-sm text-slate-500">
              Our team is happy to help clarify anything.
            </p>
          </div>
          <a
            href="mailto:support@forumsquare.in"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            <Mail className="h-4 w-4" />
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default page;
