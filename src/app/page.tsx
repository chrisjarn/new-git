import type { Metadata } from "next";
import { SiteNavigationBar } from "@/components/SiteNavigationBar";
import { Footer } from "@/components/Footer";
import { Manifesto } from "@/components/Home/Manifesto";

export const metadata: Metadata = {
  title: "ERA Safety | One Platform for Building Compliance & Emergency Readiness",
  description:
    "Stop chasing spreadsheets and shared drives. ERA connects buildings, tenants, and compliance into one system so you're always audit-ready and incident-prepared.",
};

export default function Home() {
  return (
    <>
      <SiteNavigationBar />
      <main className="flex flex-1 flex-col">
        <Manifesto />
      </main>
      <div className="flex-1" />
      <Footer />
    </>
  );
}
