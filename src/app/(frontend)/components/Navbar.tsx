'use client';

import { useState, useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import { Icon } from "@components/Common/Icon";
import { Link } from "@components/Common/Link";
import { SettingsMenu } from "@components/Elements/SettingsMenu";

export const Navbar = ({ sectionParameters }: { sectionParameters: any}) => {
    const t = useTranslations();

    const navSections = [
        {
            id: 'about',
            label: sectionParameters?.about?.shortTitle || t('about.title'),
            icon: 'faCircleUser'
        },
        {
            id: 'experiences',
            label: sectionParameters?.experiences?.shortTitle || t('experiences.title'),
            icon: 'faLaptopCode'
        },
        {
            id: 'studies',
            label: sectionParameters?.studies?.shortTitle || t('studies.title'),
            icon: 'faGraduationCap'
        },
        {
            id: 'projects',
            label: sectionParameters?.projects?.shortTitle || t('projects.title'),
            icon: 'faFolderOpen'
        },
    ];

    const [showScrollTop, setShowScrollTop] = useState(false);
    const [activeSection, setActiveSection] = useState<string>(navSections[0]?.id || '');
    const [showSettings, setShowSettings] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const gearRef = useRef<HTMLButtonElement>(null);

    // Update active section on scroll
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
            {threshold: 0, rootMargin: "-20% 0px -80% 0px"}
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

    // Close settings menu on outside click
    useEffect(() => {
        if (!showSettings) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node) && gearRef.current && !gearRef.current.contains(e.target as Node)) {
                setShowSettings(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSettings]);

    return (
        <>
            <div className="sticky top-0 z-50 flex flex-row md:flex-col items-center w-screen md:w-auto h-auto md:h-screen px-2 sm:px-4 py-1.5 md:py-8 overflow-hidden">
                <nav
                    className="flex flex-row md:flex-col items-center justify-between grow w-auto md:w-14 h-14 md:h-auto px-2 md:px-2 pr-4 py-2 md:py-6 md:pb-5 bg-zinc-900/50 md:bg-zinc-900/40 backdrop-blur-lg border border-zinc-800/50 md:border-zinc-700/50 rounded-full"
                    role="navigation"
                >
                    <div className="flex flex-row md:flex-col items-center gap-6">
                        {sectionParameters?.navbar?.links && sectionParameters.navbar.links.length > 0 && (
                            <>
                                <div className="hidden md:flex flex-row md:flex-col items-center justify-center gap-4">
                                    {sectionParameters.navbar.links.map((link: any) => (
                                        <Link
                                            key={link.id}
                                            link={link}
                                            className="flex items-center justify-center text-zinc-200 hover:text-zinc-50 hover:scale-115 transition-all ease-in-out duration-500"
                                            aria-label={link.label}
                                        >
                                            {link.icon && (
                                                <Icon name={link.icon} className="text-lg" />
                                            )}
                                        </Link>
                                    ))}
                                </div>
                                <div className="hidden md:block h-20 md:w-px bg-zinc-600"></div>
                            </>
                        )}
                        <div className="flex flex-row md:flex-col gap-1 md:gap-2">
                            {navSections.map((section) => (
                                <Link
                                    key={section.id}
                                    link={{url: `#${section.id}`, label: section.label}}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(section.id)?.scrollIntoView({behavior: 'smooth'});
                                    }}
                                    className={`
                                        group md:flex-row-reverse items-center justify-center px-4 py-2 md:[writing-mode:vertical-lr] backdrop-blur-sm border rounded-full overflow-hidden transition-all ease-in-out duration-500
                                        ${activeSection === section.id ? "flex text-zinc-200 hover:text-zinc-100 bg-zinc-500/15 hover:bg-zinc-500/20 border-zinc-300/15 hover:border-zinc-300/20"
                                        : "hidden md:flex text-zinc-400 hover:text-zinc-300 bg-zinc-600/10 hover:bg-zinc-600/20 border-zinc-300/10 hover:border-zinc-300/15"}
                                    `}
                                >
                                    
                                    <span className={`
                                        flex items-center justify-center transition-all ease-in-out duration-500 md:rotate-270
                                        ${activeSection === section.id ? ""
                                        : ""}
                                    `}>
                                        {section.icon && (
                                            <Icon name={section.icon} className="text-lg" />
                                        )}
                                    </span>
                                    <span
                                        className={`
                                            md:max-w-none text-sm font-semibold overflow-hidden whitespace-nowrap transition-all ease-in-out duration-500 md:rotate-180
                                            ${activeSection === section.id ? "max-w-40 md:max-h-40 opacity-100 pl-2 md:pl-0 md:pt-3"
                                            : "max-w-0 md:max-h-0 opacity-0"}
                                        `}
                                    >
                                        {section.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className={`
                            flex items-center justify-center p-1 aspect-square rounded-full text-zinc-200 hover:text-zinc-50 hover:scale-115 hover:rotate-180 transition-all ease-in-out duration-500 cursor-pointer
                            ${showSettings ? 'scale-115 md:rotate-180' : ''}
                        `}
                        onClick={() => setShowSettings(prev => !prev)}
                        aria-label={showSettings ? t('navbar.settingsMenu.closeSettings') : t('navbar.settingsMenu.openSettings')}
                        ref={gearRef}
                    >
                        <span className="flex items-center md:hidden">
                            <Icon name="faEllipsisVertical" className="text-xl" />
                        </span>
                        <span className="hidden md:flex items-center">
                            <Icon name="faGear" className="text-xl" />
                        </span>
                    </button>
                </nav>
                <button
                    type="button"
                    className={`
                        flex items-center justify-center cursor-pointer text-zinc-200 hover:text-zinc-50 bg-zinc-900/50 md:bg-zinc-900/40 hover:bg-zinc-800/50 backdrop-blur-lg border border-zinc-800/50 md:border-zinc-700/50 hover:border-zinc-700/50 hover:md:border-zinc-600/50 rounded-full overflow-hidden transition-all duration-500 ease-in-out 
                        ${showScrollTop ? 'w-14 h-14 opacity-100 translate-0 ml-2 md:ml-0 md:mt-6'
                        : 'w-0 h-0 opacity-0 translate-x-24 md:translate-x-0 md:translate-y-24 pointer-events-none ml-0 md:mt-0'}
                    `}
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    aria-label={t('navbar.scrollTop')}
                    tabIndex={showScrollTop ? 0 : -1}
                    aria-hidden={!showScrollTop}
                >
                    <Icon name="faChevronUp" className="text-lg" />
                </button>
            </div>

            <div ref={menuRef} className="fixed z-40 top-17 md:top-auto right-2 md:right-auto md:bottom-8 left-2 md:left-auto md:ml-21">
                <SettingsMenu sectionParameters={sectionParameters} showSettings={showSettings} setShowSettings={setShowSettings} />
            </div>
        </>
    );
};