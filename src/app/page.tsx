"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { About } from "@/components/About";

export default function Home() {
  return (
    <div className="grid sm:grid-cols-[auto_1fr] min-h-screen max-w-7xl mx-auto">
      <Navbar />
      
      <div className="flex flex-col gap-20 px-8 py-6 sm:py-10">
        <About />

        <Footer />
      </div>
    </div>
  );
}
