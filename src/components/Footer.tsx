"use client";

import Link from "next/link";
import { XIcon, LinkedInIcon } from "@/components/ui/Icons";
import FooterLines from "@/components/Home/FooterLines";
import { EraLogo } from "@/components/illustrations/era-logo";

const footerData = [
  {
    id: 1,
    title: "Product",
    subLinks: [
      { label: "Features", href: "/" },
      { label: "Pricing", href: "/" },
      { label: "Integrations", href: "/" },
      { label: "FAQ", href: "/" },
    ],
  },
  {
    id: 2,
    title: "Resources",
    subLinks: [
      { label: "Documentation", href: "/" },
      { label: "Help & Support", href: "/" },
      { label: "Security", href: "/" },
    ],
  },
  {
    id: 3,
    title: "Company",
    subLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function FooterLinkColumn({
  data,
}: {
  data: (typeof footerData)[number];
}) {
  return (
    <li className="tracking-[-0.09px]">
      <p className="text-primary text-sm font-medium leading-[105%]">
        {data.title}
      </p>
      <ul className="mt-4 flex list-none flex-col gap-y-3">
        {data.subLinks.map((link) => (
          <li key={link.label} className="leading-[105%]">
            <Link
              className="text-tertiary hover:text-primary text-sm leading-[120%] transition-colors duration-100 ease-in"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

const socialIconClass =
  "text-quaternary hover:text-primary transition-colors duration-100 ease-in";

export function Footer() {
  return (
    <div className="mx-auto w-[min(100%,1082px)] px-5 pb-12 md:p-0 md:pb-6">
      <footer className="relative overflow-hidden bg-card rounded-2xl px-6 py-10 md:p-12">
        {/* Background logo watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <EraLogo className="h-full scale-140 w-auto text-sand-2 opacity-20" />
        </div>
        <div className="flex flex-col justify-between gap-x-20 gap-y-12 md:flex-row md:gap-y-0">
          {/* Logo + disclaimer */}
          <div>
            <Link href="/" className="select-none">
              <span className="text-primary text-lg font-semibold">
                ERA Safety
              </span>
            </Link>
            <p className="text-quaternary mt-8 max-w-[433px] text-sm leading-[120%] tracking-[0.1px]">
              ERA Safety provides a unified platform for building safety,
              compliance, and emergency readiness. Our tools help organizations
              manage risks, maintain regulatory compliance, and coordinate
              emergency response across teams and locations.
            </p>
          </div>

          {/* Link columns */}
          <div className="w-[min(100%,457px)]">
            <ul className="flex list-none flex-wrap justify-start gap-8 xs:flex-nowrap xs:justify-between md:justify-start md:gap-x-[4.5rem]">
              {footerData.map((item) => (
                <FooterLinkColumn key={item.id} data={item} />
              ))}
            </ul>
          </div>
        </div>

        {/* Social icons + copyright */}
        <div className="mt-[6.5rem] flex w-full items-center justify-between">
          <div className="flex items-center gap-x-5">
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">X/Twitter</span>
              <XIcon className={socialIconClass} />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">LinkedIn</span>
              <LinkedInIcon className={socialIconClass} />
            </Link>
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} ERA Safety. All rights reserved.
          </p>
        </div>
      </footer>

      <FooterLines showGlow={false} />
    </div>
  );
}
