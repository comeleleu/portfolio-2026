import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Fab from "@fortawesome/free-brands-svg-icons";
import * as Fas from "@fortawesome/free-solid-svg-icons";

export const Footer = ({ sectionParameters }: { sectionParameters: any }) => {
    return (
        <footer className="flex flex-row justify-between text-sm text-neutral-400 border-t border-neutral-700 py-6 sm:py-10">
            <p>© {new Date().getFullYear()} - Côme Leleu</p>
            <div className="hidden sm:flex flex-row items-center gap-4">
                {sectionParameters?.links?.map((link: any) => {
                    const icon = (Fas as any)[link.icon] || (Fab as any)[link.icon] || Fas.faLink;
                    return (
                        <a key={link.id ?? link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 hover:scale-115 transition-all ease-in-out duration-500">
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