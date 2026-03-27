import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Fab from "@fortawesome/free-brands-svg-icons";
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type LinkItem = {
    url: string;
    label: string;
    icon: IconProp;
};

type SectionHeaderProps = {
    title: string;
    sectionIcon?: IconProp;
    color?: string;
    links?: LinkItem[];
};

export const SectionHeader = ({
    title,
    sectionIcon,
    color = "after:bg-indigo-500",
    links
}: SectionHeaderProps) => {

    return (
        <div className="flex flex-col md:flex-row justify-between items-baseline md:items-end gap-8 my-8">
            <div className="flex flex-row gap-4 items-baseline">
                {sectionIcon && <span className="text-2xl text-neutral-600"><FontAwesomeIcon icon={sectionIcon} className="text-xl" /></span>}
                <h2 className={`text-5xl font-semibold text-neutral-300 tracking-wide relative after:content-[''] after:absolute after:h-1 after:w-4/5 ${color} after:rounded-full after:-bottom-1 after:-left-6`}>
                    {title}
                </h2>
            </div>
            {(links && links.length > 0) && (
                <div className="flex justify-between md:justify-end flex-wrap gap-2">
                    {links && (
                        links.map((link) => (
                            <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-6 py-3 text-sm text-neutral-500 font-semibold bg-neutral-600/10 hover:bg-neutral-600/20 backdrop-blur-lg border border-neutral-400/10 rounded-full transition-colors ease-in-out duration-500"
                            >
                                <FontAwesomeIcon icon={link.icon} className="text-lg" />
                                {link.label}
                                <FontAwesomeIcon icon={Fas.faArrowUpRightFromSquare} className="inline-block text-xs text-neutral-400/20 group-hover:text-neutral-400/50 transition-all ease-in-out duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5" />
                            </a>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
