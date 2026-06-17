import { t } from '@utils/getTranslations';
import { Icon } from "@components/Common/Icon";
import { Link } from "@components/Common/Link";

export const Footer = async ({ sectionParameters }: { sectionParameters: any }) => {    
    const createdWith = await t('footer.createdWith', {
        nextJs: <Link key="nextJs" link={{ url: "https://nextjs.org/", label: "Next.js" }} />,
        payload: <Link key="payload" link={{ url: "https://payloadcms.com/", label: "Payload" }} />,
        tailwindCss: <Link key="tailwindCss" link={{ url: "https://tailwindcss.com/", label: "Tailwind CSS" }} />,
    });
    const hostedBy = await t('footer.hostedBy', {
        vercel: <Link key="vercel" link={{ url: "https://vercel.com/", label: "Vercel" }} />,
    });

    return (
        <footer
            className="flex flex-col-reverse md:flex-row justify-between items-start gap-4 md:gap-12 text-sm text-zinc-400 border-t border-zinc-700 py-6 md:py-8"
            role="contentinfo"
        >
            <p>© {new Date().getFullYear()} — {await t('about.fullname')}</p>
            <div className="hidden md:flex flex-row items-center gap-4">
                {sectionParameters?.links?.map((link: any) => {
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
            <p>
                {createdWith} {hostedBy}
            </p>
        </footer>
    );
}