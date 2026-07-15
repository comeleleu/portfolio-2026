import { Icon } from "@components/Common/Icon";
import { Link } from "@components/Common/Link";

type SectionHeaderProps = {
    title: string;
    sectionIcon?: string;
    underlineFromColor?: string;
    underlineToColor?: string;
    underlineFromStop?: string;
    underlineToStop?: string;
    links: any[];
};

export const SectionHeader = ({
    title,
    sectionIcon,
    underlineFromColor = "[--underline-from:var(--color-red-500)]",
    underlineToColor = "[--underline-to:var(--color-green-500)]",
    underlineFromStop = "[--underline-from-stop:5%]",
    underlineToStop = "[--underline-to-stop:95%]",
    links = []
}: SectionHeaderProps) => {

    return (
        <div className="flex flex-col lg:flex-row justify-between items-baseline lg:items-end gap-6 sm:gap-8 my-6 lg:mb-12">
            <h2 className="text-3xl font-semibold text-zinc-200">
                <span className={`
                    bg-underline-rounded pb-0.75 leading-normal
                    [--underline-start:0.5em] [--underline-width:90%] [--underline-height:4px]
                    ${underlineFromColor} ${underlineToColor} ${underlineFromStop} ${underlineToStop}`}>
                    {sectionIcon && (
                        <Icon name={sectionIcon} className="inline-block mr-4 text-lg text-zinc-600" />
                    )}
                    {title}
                </span>
            </h2>
            {(links && links.length > 0) && (
                <div className="flex justify-between lg:justify-end flex-wrap gap-2">
                    {links && (
                        links.map((link) => (
                            <Link
                                key={link.id}
                                link={link}
                                className="group flex items-center gap-2 px-6 py-3 text-sm font-semibold text-zinc-400 hover:text-zinc-300 bg-zinc-500/10 hover:bg-zinc-500/20 backdrop-blur-lg border border-zinc-300/15 hover:border-zinc-300/20 rounded-full transition-colors ease-in-out duration-500"
                            >
                                {link.icon && (
                                    <Icon name={link.icon} className="text-lg" />
                                )}
                                {link.label}
                                <Icon name="faArrowUpRightFromSquare" className="text-xs text-zinc-700 group-hover:text-zinc-500 transition-all ease-in-out duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5" />
                            </Link>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
