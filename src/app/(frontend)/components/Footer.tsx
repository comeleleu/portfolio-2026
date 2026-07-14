import { useTranslations } from 'next-intl';
import { Icon } from "@components/Common/Icon";
import { Link } from "@components/Common/Link";

export const Footer = ({ sectionParameters }: { sectionParameters: any }) => {
    const t = useTranslations();
    const startYear = 2026;
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="flex flex-col md:flex-row justify-between items-stretch md:items-start gap-4 md:gap-12 text-sm text-zinc-400 border-t border-zinc-700 py-6 md:py-8"
            role="contentinfo"
        >
            <p className="order-3 md:order-0">
                {t.rich(startYear == currentYear ? 'footer.credits' : 'footer.creditsPeriod', {
                    startYear: (chunks) => startYear,
                    currentYear: (chunks) => currentYear,
                    name: (chunks) => sectionParameters?.about?.fullname || t('about.fullname')
                })}
            </p>
            <div className="order-1 md:order-0 flex flex-row items-center gap-8">
                <p className="md:hidden text-sm font-medium text-zinc-200">
                    {t('navbar.settingsMenu.socialLinks')}
                </p>
                <div className="flex flex-row items-center gap-4">
                    {sectionParameters?.navbar?.links?.map((link: any) => {
                        return (
                            <Link
                                key={link.id}
                                link={link}
                                className="hover:text-zinc-300 hover:scale-115 transition-all ease-in-out duration-500"
                                aria-label={link.label}
                            >
                                {link.icon && (
                                    <Icon name={link.icon} className="text-lg" />
                                )}
                            </Link>
                        );
                    })}
                </div>  
            </div>
            <p className="order-2 md:order-0">
                {t.rich('footer.createdWith', {
                    nextJs: (chunks) => <Link link={{ url: "https://nextjs.org/", label: "Next.js" }} />,
                    payload: (chunks) => <Link link={{ url: "https://payloadcms.com/", label: "Payload" }} />,
                    tailwindCss: (chunks) => <Link link={{ url: "https://tailwindcss.com/", label: "Tailwind CSS" }} />
                })} {t.rich('footer.hostedBy', {
                    vercel: (chunks) => <Link link={{ url: "https://vercel.com/", label: "Vercel" }} />
                })}
            </p>
        </footer>
    );
}