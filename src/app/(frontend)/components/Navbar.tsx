import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Fab from "@fortawesome/free-brands-svg-icons";
import * as Fas from "@fortawesome/free-solid-svg-icons";

export const Navbar = ({ sectionParameters }: { sectionParameters: any }) => {
    return (
        <div className="sticky top-0 z-50 flex flex-row sm:flex-col items-center justify-between gap-6 sm:h-screen px-8 sm:px-auto py-6 sm:py-10 bg-linear-to-b from-neutral-950/95 via-neutral-950/50 to-transparent via-60% to-99% sm:bg-none overflow-hidden">
            <div className="relative z-10 flex flex-row sm:flex-col items-center gap-6">
                <div className="relative z-10 flex flex-row sm:flex-col items-center gap-6">
                    {sectionParameters?.links?.map((link: any) => {
                        const icon = (Fas as any)[link.icon] || (Fab as any)[link.icon] || Fas.faLink;
                        return (
                            <a key={link.id ?? link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={icon} className="w-8 h-8" />
                            </a>
                        );
                    })}
                </div>
                <div className="h-px sm:h-20 w-20 sm:w-px bg-neutral-600"></div>
            </div>
            <div className="relative z-10">
                <FontAwesomeIcon icon={Fas.faChevronUp} className="w-8 h-8" />
            </div>
        </div>
    );
};