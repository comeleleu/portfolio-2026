import { getIcon } from "@utils/getIcon";
import { Link } from "@components/Common/Link";

export const Footer = ({ sectionParameters }: { sectionParameters: any }) => {
    return (
        <footer
            className="flex flex-row justify-between text-sm text-zinc-400 border-t border-zinc-700 py-6 sm:py-10"
            role="contentinfo"
        >
            <p>© {new Date().getFullYear()} — Côme Leleu</p>
            <div className="hidden sm:flex flex-row items-center gap-4">
                {sectionParameters?.links?.map((link: any) => {
                    return (
                        <Link
                            key={link.id}
                            link={link}
                            className="hover:text-zinc-300 hover:scale-115 transition-all ease-in-out duration-500"
                            aria-label={link.label}
                        >
                            {link.icon && getIcon(link.icon, true, "text-lg")}
                        </Link>
                    );
                })}
            </div>
            <p>
                Build with <Link link={{url:"https://nextjs.org/", label:"Next.js"}} />, <Link link={{url:"https://payloadcms.com/", label:"Payload"}} /> and <Link link={{url:"https://tailwindcss.com/", label:"Tailwind CSS"}} />
            </p>
        </footer>
    );
};