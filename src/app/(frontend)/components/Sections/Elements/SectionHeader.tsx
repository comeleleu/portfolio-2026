import { getIcon } from "@utils/getIcon";

type SectionHeaderProps = {
    title: string;
    sectionIcon?: string;
    afterColor?: string;
    links: any[];
};

export const SectionHeader = ({
    title,
    sectionIcon,
    afterColor = "after:bg-indigo-500",
    links = []
}: SectionHeaderProps) => {

    return (
        <div className="flex flex-col md:flex-row justify-between items-baseline md:items-end gap-8 mt-8 mb-12">
            <div className="flex flex-row gap-4 items-baseline">
                {sectionIcon && getIcon(sectionIcon, true, "text-2xl text-zinc-600")}
                <h2 className={`text-5xl font-semibold text-zinc-200 tracking-wide relative after:content-[''] after:absolute after:h-1 after:w-4/5 ${afterColor} after:rounded-full after:-bottom-1 after:-left-6`}>
                    {title}
                </h2>
            </div>
            {(links && links.length > 0) && (
                <div className="flex justify-between md:justify-end flex-wrap gap-2">
                    {links && (
                        links.map((link) => (
                            <a
                                key={link.id ?? link.url}
                                href={link.url}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                className="group flex items-center gap-2 px-6 py-3 text-sm font-semibold text-zinc-400 hover:text-zinc-300 bg-zinc-500/10 hover:bg-zinc-500/20 backdrop-blur-lg border border-zinc-300/15 hover:border-zinc-300/20 rounded-full transition-colors ease-in-out duration-500"
                            >
                                {link.icon && getIcon(link.icon, true, "text-lg")}
                                {link.label}
                                {getIcon("faArrowUpRightFromSquare", true, "inline-block text-xs text-zinc-700 group-hover:text-zinc-500 transition-all ease-in-out duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5")}
                            </a>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
