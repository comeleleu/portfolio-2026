import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Fab from "@fortawesome/free-brands-svg-icons";
import * as Fas from "@fortawesome/free-solid-svg-icons";

export const Footer = ({ sectionParameters }: { sectionParameters: any }) => {
    return (
        <footer
            className="flex flex-row justify-between text-sm text-zinc-400 border-t border-zinc-700 py-6 sm:py-10"
            role="contentinfo"
        >
            <p>© {new Date().getFullYear()} - Côme Leleu</p>
            <div className="hidden sm:flex flex-row items-center gap-4">
                {sectionParameters?.links?.map((link: any) => {
                    const icon = (Fas as any)[link.icon] || (Fab as any)[link.icon] || Fas.faLink;
                    return (
                        <a
                            key={link.id ?? link.url}
                            href={link.url}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className="hover:text-zinc-300 hover:scale-115 transition-all ease-in-out duration-500"
                            aria-label={link.label}
                        >
                            <FontAwesomeIcon icon={icon} className="text-lg" />
                        </a>
                    );
                })}
            </div>
            <p>
                Build with <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>, <a href="https://payloadcms.com/" target="_blank" rel="noopener noreferrer">Payload</a> and <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>
            </p>
        </footer>
    );
};