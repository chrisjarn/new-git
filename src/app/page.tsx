import type { Metadata } from "next";
import { SiteNavigationBar } from "@/components/SiteNavigationBar";
import { Footer } from "@/components/Footer";
import { Manifesto } from "@/components/Home/Manifesto";

export const metadata: Metadata = {
  title: "ERA Safety — Intelligent Safety Management",
  description:
    "ERA replaces fragmented safety systems with a single platform that connects buildings, tenants, and compliance obligations into one coordinated workflow.",
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
