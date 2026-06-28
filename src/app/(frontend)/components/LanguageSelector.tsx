"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

export const LanguageSelector = () => {
    const t = useTranslations();
    const locale = useLocale();
    const nextLocale = locale === "en" ? "fr" : "en";

    const [showLanguageSelector, setShowLanguageSelector] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setShowLanguageSelector(window.scrollY <= 150);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <a
            href={`/${nextLocale}`}
            className={`
                fixed z-50 right-2 sm:right-4 bottom-1.5 md:bottom-8 flex items-center justify-center cursor-pointer text-zinc-300 font-semibold hover:text-zinc-100 bg-zinc-900/50 md:bg-zinc-900/40 hover:bg-zinc-800/50 backdrop-blur-lg border border-zinc-800/50 md:border-zinc-700/50 hover:border-zinc-700/50 hover:md:border-zinc-600/50 rounded-full overflow-hidden transition-all duration-500 ease-in-out 
                ${showLanguageSelector ? 'w-12 h-12 opacity-100 translate-0'
                : 'w-0 h-0 mr-6 opacity-0 translate-y-24 pointer-events-none'}
            `}
            aria-label={t('navbar.scrollTop')}
            tabIndex={showLanguageSelector ? 0 : -1}
            aria-hidden={!showLanguageSelector}
        >
            {nextLocale.toUpperCase()}
        </a>
    );
};
