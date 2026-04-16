'use client';

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Fab from "@fortawesome/free-brands-svg-icons";
import * as Fas from "@fortawesome/free-solid-svg-icons";

const navSections = [
    { id: 'about', label: 'About', icon: 'faCircleUser' },
    { id: 'experiences', label: 'Experiences', icon: 'faLaptopCode' },
    { id: 'studies', label: 'Studies', icon: 'faGraduationCap' },
    { id: 'projects', label: 'Projects', icon: 'faFolderOpen' },
];

export const Navbar = ({ sectionParameters }: { sectionParameters: any }) => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0, rootMargin: "-35% 0px -55% 0px" }
        );

        navSections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="sticky top-0 z-50 flex flex-row sm:flex-col items-center w-screen sm:w-auto h-auto sm:h-screen px-4 sm:px-6 py-4 sm:py-10 overflow-hidden">
            <nav className="flex flex-row sm:flex-col items-center gap-6 grow w-auto sm:w-14 h-14 sm:h-auto px-6 sm:px-2 py-2 sm:py-6 bg-zinc-900/50 sm:bg-zinc-900/40 backdrop-blur-lg border border-zinc-800/50 sm:border-zinc-700/50 rounded-full">
                <div className="flex flex-row sm:flex-col items-center gap-4">
                    {sectionParameters?.links?.map((link: any) => (
                        <a
                            key={link.id ?? link.url}
                            href={link.url}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className="text-zinc-200 hover:text-zinc-50 hover:scale-115 transition-all ease-in-out duration-500"
                        >
                            <FontAwesomeIcon icon={(Fas as any)[link.icon] || (Fab as any)[link.icon] || Fas.faLink} className="text-lg" />
                        </a>
                    ))}
                </div>
                <div className="h-px sm:h-20 w-10 sm:w-px bg-zinc-600"></div>
                <div className="flex flex-row sm:flex-col gap-1 sm:gap-2">
                    {navSections.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`
                                group sm:flex-row-reverse items-center px-4 py-2 sm:[writing-mode:vertical-lr] backdrop-blur-sm border rounded-full overflow-hidden transition-all ease-in-out duration-500
                                ${activeSection === section.id ? "flex text-zinc-200 hover:text-zinc-100 bg-zinc-500/15 hover:bg-zinc-500/20 border-zinc-300/15 hover:border-zinc-300/20"
                                : "hidden sm:flex text-zinc-400 hover:text-zinc-300 bg-zinc-600/10 hover:bg-zinc-600/20 border-zinc-300/10 hover:border-zinc-300/15"}
                            `}
                        >
                            
                            <span className={`
                                transition-all ease-in-out duration-500 sm:rotate-270
                                ${activeSection === section.id ? ""
                                : ""}
                            `}>
                                {section.icon && <FontAwesomeIcon icon={(Fas as any)[section.icon] || (Fab as any)[section.icon] || Fas.faLink} className="text-lg" />}
                            </span>
                            <span
                                className={`
                                    sm:max-w-none text-sm font-bold overflow-hidden whitespace-nowrap transition-all ease-in-out duration-500 sm:rotate-180
                                    ${activeSection === section.id ? "max-w-40 sm:max-h-40 opacity-100 pl-2 sm:pl-0 sm:pt-3"
                                    : "max-w-0 sm:max-h-0 opacity-0"}
                                `}
                            >
                                {section.label}
                            </span>
                        </a>
                    ))}
                </div>
            </nav>
            <button
                type="button"
                className={`
                    flex items-center justify-center cursor-pointer text-zinc-200 hover:text-zinc-50 bg-zinc-900/50 sm:bg-zinc-900/40 hover:bg-zinc-800/50 backdrop-blur-lg border border-zinc-800/50 sm:border-zinc-700/50 hover:border-zinc-700/50 hover:sm:border-zinc-600/50 rounded-full overflow-hidden transition-all duration-500 ease-in-out 
                    ${showScrollTop ? 'w-14 h-14 opacity-100 translate-0 ml-6 sm:ml-0 sm:mt-6'
                    : 'w-0 h-0 opacity-0 translate-x-24 sm:translate-x-0 sm:translate-y-24 pointer-events-none ml-0 sm:mt-0'}
                `}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <FontAwesomeIcon icon={Fas.faChevronUp} className="text-lg" />
            </button>
        </div>
    );
};