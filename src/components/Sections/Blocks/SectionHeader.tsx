import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type LinkItem = {
    url: string;
    label: string;
    icon: IconProp;
};

type SectionHeaderProps = {
    title: string;
    color?: string;
    links?: LinkItem[];
};

export const SectionHeader = ({
    title,
    color = "bg-indigo-500",
    links
}: SectionHeaderProps) => {
    return (
        <div className="flex flex-row justify-between items-end mb-8">
            <div className="flex flex-col gap-1">
                <h2 className="text-5xl font-semibold text-neutral-300 tracking-wide">{title}</h2>
                <div className={`h-1 w-20 ${color} rounded-full`}></div>
            </div>
            {(links && links.length > 0) && (
                <div className="flex items-baseline gap-4">
                    {links && (
                        <div className="flex flex-row flex-wrap gap-2">
                            {links.map((link) => (
                                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-6 py-3 text-sm text-neutral-500 font-semibold bg-neutral-600/10 backdrop-blur-lg border border-neutral-400/10 rounded-full hover:bg-neutral-600/20 transition-colors">
                                    <FontAwesomeIcon icon={link.icon} className="text-lg" />
                                    {link.label}
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="inline-block text-xs text-neutral-400/50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
