"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@components/Common/Icon";
import { Link } from "@components/Common/Link";

export const SettingsMenu = ({ sectionParameters, openSettings, setOpenSettings }: { sectionParameters: any, openSettings: boolean, setOpenSettings: (value: boolean) => void }) => {
    const t = useTranslations("navbar.settingsMenu");
    const locale = useLocale();
    const [selectedLang, setSelectedLang] = useState(locale);
    const [isHidden, setIsHidden] = useState(!openSettings);
    const [showSettings, setShowSettings] = useState(openSettings);
    const [gliderStyle, setGliderStyle] = useState({ width: 0, left: 0, height: 0, top: 0 });
    const [isGliderInitialized, setIsGliderInitialized] = useState(false);
    const gliderContainerRef = useRef<HTMLDivElement>(null);
    const gliderButtonEnRef = useRef<HTMLButtonElement>(null);
    const gliderButtonFrRef = useRef<HTMLButtonElement>(null);

    if (openSettings && isHidden) {
        setIsHidden(false);
    }
    if (!openSettings && showSettings) {
        setShowSettings(false);
    }

    useEffect(() => {
        let t: NodeJS.Timeout;
        if (openSettings) {
            t = setTimeout(() => setShowSettings(true), 10);
        } else {
            t = setTimeout(() => setIsHidden(true), 300);
        }
        return () => clearTimeout(t);
    }, [openSettings]);
    
    useLayoutEffect(() => {
        const ref = selectedLang === 'en' ? gliderButtonEnRef : gliderButtonFrRef;
        
        if (ref.current && gliderContainerRef.current && !isHidden) {
            const { offsetLeft, offsetWidth, offsetHeight } = ref.current;
            const gliderContainerStyle = getComputedStyle(gliderContainerRef.current);
            const gliderContainerPaddingLeft = parseFloat(gliderContainerStyle.paddingLeft);

            setGliderStyle({ width: offsetWidth, left: offsetLeft - gliderContainerPaddingLeft, height: offsetHeight, top: 0 });
            setTimeout(() => {
                setIsGliderInitialized(true);
            }, 10);
        }
    }, [selectedLang, isHidden]);

    const handleLanguageChange = (lang: 'en' | 'fr') => {
        if (selectedLang !== lang) {
            setSelectedLang(lang);
            // Delay before closing the settings menu
            setTimeout(() => {
                setOpenSettings(false);
                // After menu is closed, redirect after a short delay
                setTimeout(() => {
                    window.location.href = `/${lang}`;
                }, 300);
            }, 400);
        }
    };

    return (
        <div className={`
            ${isHidden ? 'hidden'
                : 'flex'}
            flex-col items-stretch gap-4 min-w-72 md:min-w-96 p-4 px-6 md:px-8 md:py-6 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 md:border-zinc-700/50 rounded-3xl shadow-lg transition-all ease-in-out duration-300
            ${showSettings ? 'opacity-100'
                : 'opacity-0 md:-translate-x-6 -translate-y-4 md:translate-y-0'}
        `}>
            
            <div className="flex md:hidden flex-col items-stretch gap-4 pb-6 border-b border-zinc-700/50 ">
                <p className="is-title flex flex-row items-center gap-3 text-xl font-semibold text-zinc-100">
                    <Icon name="faEllipsisVertical" className="text-lg" />
                    <span className="relative after:content-[''] after:absolute after:h-0.5 after:w-5/6 after:bg-indigo-500 after:rounded-full after:-bottom-1 after:-left-2">
                        {t('misc')}
                    </span>
                </p>

                <div className="flex flex-col gap-2">
                    {sectionParameters?.navbar?.links && sectionParameters.navbar.links.length > 0 && (
                        <div className="flex flex-row items-center justify-between gap-4 min-h-10">
                            <p className="text-sm font-medium text-zinc-200">
                                {t('socialLinks')}
                            </p>
                            <div className="flex flex-row items-center justify-center gap-6">
                            {sectionParameters.navbar.links.map((link: any) => (
                                <Link
                                    key={link.id}
                                    link={link}
                                    className="flex items-center justify-center text-zinc-200 hover:text-zinc-50 hover:scale-115 transition-all ease-in-out duration-500"
                                    aria-label={link.label}
                                    tabIndex={showSettings ? 0 : -1}
                                    aria-hidden={!showSettings}
                                >
                                    {link.icon && (
                                        <Icon name={link.icon} className="text-xl" />
                                    )}
                                </Link>
                            ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-stretch gap-4 pb-6 border-b border-zinc-700/50">
                <p className="is-title flex flex-row items-center gap-3 text-xl font-semibold text-zinc-100">
                    <Icon name="faGear" className="text-lg" />
                    <span className="relative after:content-[''] after:absolute after:h-0.5 after:w-5/6 after:bg-indigo-500 after:rounded-full after:-bottom-1 after:-left-2">
                        {t('settings')}
                    </span>
                </p>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-between gap-4 min-h-10">
                        <p className="text-sm font-medium text-zinc-200">
                            {t('language.label')}
                        </p>
                        <div ref={gliderContainerRef} className="relative flex gap-1 p-1 bg-zinc-500/15 backdrop-blur-sm border border-zinc-300/15 rounded-full">
                            <span
                                className={`
                                    absolute bg-indigo-700/20 border border-indigo-300/20 rounded-full
                                    ${isGliderInitialized ? 'transition-all ease-in-out duration-300' : ''}
                                `}
                                style={{ width: gliderStyle.width, height: gliderStyle.height, transform: `translateX(${gliderStyle.left}px)` }}>
                            </span>
                            <button
                                type="button"
                                className={`
                                    relative z-10 px-3 py-1.5 text-sm font-semibold rounded-full transition-all ease-in-out duration-300
                                    ${selectedLang === 'en' ? 'text-indigo-400'
                                    : 'text-zinc-300 hover:text-zinc-200 cursor-pointer'}
                                `}
                                onClick={() => handleLanguageChange('en')}
                                disabled={selectedLang === 'en'}
                                aria-label={t('language.options.enAriaLabel')}
                                tabIndex={showSettings ? 0 : -1}
                                aria-hidden={!showSettings}
                                ref={gliderButtonEnRef}
                            >
                                {t('language.options.en')}
                            </button>
                            <button
                                type="button"
                                className={`
                                    relative z-10 px-3 py-1.5 text-sm font-semibold rounded-full transition-all ease-in-out duration-300
                                    ${selectedLang === 'fr' ? 'text-indigo-400'
                                    : 'text-zinc-300 hover:text-zinc-200 cursor-pointer'}
                                `}
                                onClick={() => handleLanguageChange('fr')}
                                disabled={selectedLang === 'fr'}
                                aria-label={t('language.options.frAriaLabel')}
                                tabIndex={showSettings ? 0 : -1}
                                aria-hidden={!showSettings}
                                ref={gliderButtonFrRef}
                            >
                                {t('language.options.fr')}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-4 min-h-10">
                        <p className="text-sm font-medium text-zinc-200">
                            {t('theme.label')}
                        </p>
                        <p className="text-sm text-zinc-400">
                            {t('theme.comment')}
                        </p>
                    </div>
                </div>
            </div>
            

            <div className="flex flex-col items-stretch gap-4 md:mt-2">
                <p className="is-title text-sm font-light text-zinc-300">
                    {t('cookies')}
                </p>
            </div>
        </div>
    );
};
