import type { Metadata } from "next";
import { SiteNavigationBar } from "@/components/SiteNavigationBar";
import { Footer } from "@/components/Footer";
import ContactSection from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us | ERA Safety",
  description:
    "Get in touch with the ERA Safety team. Book a demo, ask a question, or learn how ERA fits your portfolio.",
};

export default function ContactPage() {
  return (
    <>
      <SiteNavigationBar />
      <main className="flex flex-1 flex-col">
        <ContactSection />
      </main>
      <div className="flex-1" />
      <Footer />
    </>
  );
}
