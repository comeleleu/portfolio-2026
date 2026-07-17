"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Icon } from "@components/Common/Icon";
import { Link } from "@components/Common/Link";
import { Glider } from "@components/Elements/Glider";

export const SettingsMenu = ({ sectionParameters, openSettings, setOpenSettings }: { sectionParameters: any, openSettings: boolean, setOpenSettings: (value: boolean) => void }) => {
    const t = useTranslations("navbar.settingsMenu");
    const locale = useLocale();
    const [selectedLang, setSelectedLang] = useState(locale);
    const {theme, setTheme} = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme || "system");
    const [isHidden, setIsHidden] = useState(!openSettings);
    const [showSettings, setShowSettings] = useState(openSettings);

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

    const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
        setSelectedTheme(theme);
        setTimeout(() => {
            setTheme(theme);
        }, 300);
    };

    return (
        <div className={`
            ${isHidden ? 'hidden'
                : 'flex'}
            flex-col items-stretch gap-4 min-w-72 md:min-w-96 p-4 px-6 md:px-8 md:py-6 bg-zinc-900/50 backdrop-blur-lg border border-zinc-800/50 md:border-zinc-700/50 rounded-3xl transition-all ease-in-out duration-300
            ${showSettings ? 'opacity-100'
                : 'opacity-0 md:-translate-x-6 -translate-y-4 md:translate-y-0'}
        `}>
            
            <div className="flex md:hidden flex-col items-stretch gap-4 pb-6 border-b border-zinc-700/50 ">
                <p className="is-title flex flex-row items-center gap-3 text-xl font-semibold text-zinc-100">
                    <Icon name="faEllipsis" className="text-lg" />
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
                        <Glider
                            options={[
                                {
                                    id: 'en',
                                    label: t('language.options.en'),
                                    ariaLabel: t('language.options.enAriaLabel'),
                                    action: () => handleLanguageChange('en'),
                                },
                                {
                                    id: 'fr',
                                    label: t('language.options.fr'),
                                    ariaLabel: t('language.options.frAriaLabel'),
                                    action: () => handleLanguageChange('fr'),
                                }
                            ]}
                            activeId={selectedLang}
                            isVisible={!isHidden}
                            isActive={showSettings}
                        />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-4 min-h-10">
                        <p className="text-sm font-medium text-zinc-200">
                            {t('theme.label')}
                        </p>
                        <Glider
                            options={[
                                {
                                    id: 'light',
                                    label: "☀️",
                                    ariaLabel: "Switch to light theme",
                                    action: () => handleThemeChange('light'),
                                },
                                {
                                    id: 'system',
                                    label: "System",
                                    ariaLabel: "Switch to system theme",
                                    action: () => handleThemeChange('system'),
                                },
                                {
                                    id: 'dark',
                                    label: "🌙",
                                    ariaLabel: "Switch to dark theme",
                                    action: () => handleThemeChange('dark'),
                                }
                            ]}
                            activeId={selectedTheme}
                            isVisible={!isHidden}
                            isActive={showSettings}
                        />
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
