"use client";

import { Navbar } from "@components/Navbar";
import { About } from "@components/About";
import { Experiences } from "@components/Experiences";
import { Projects } from "@components/Projects";
import { Footer } from "@components/Footer";

export default function Home() {

    return (
        <div className="grid sm:grid-cols-[auto_1fr] min-h-screen max-w-7xl mx-auto">
            <Navbar />

            <div className="flex flex-col gap-32 px-8 py-6 sm:py-10">
                <About />

                <Experiences />

                <Projects />

                <Footer />
            </div>
        </div>
    );
}
