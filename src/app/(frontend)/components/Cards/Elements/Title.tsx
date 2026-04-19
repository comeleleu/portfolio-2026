import { ReactNode } from "react";
import { getIcon } from "@utils/getIcon";

type TitleProps = {
    title: string;
    subtitle?: string;
    isLink?: boolean;
    subtitleColor?: string;
    children?: ReactNode;
};

export const Title = ({
    title,
    subtitle,
    isLink = false,
    subtitleColor = "text-indigo-500",
    children
}: TitleProps) => {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="flex items-center gap-4 text-2xl font-semibold text-zinc-200">
                {title}
                {isLink && 
                    getIcon("faArrowUpRightFromSquare", true, "inline-block text-xs text-zinc-700 group-hover:text-zinc-500 transition-all ease-in-out duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5")
                }
            </h3>
            {(subtitle || children) && (
                <div className={`flex flex-col md:flex-row md:items-center gap-1 md:gap-12 text-lg ${subtitleColor}`}>
                    {subtitle && (
                        <p className="font-semibold">{subtitle}</p>
                    )}
                    {children}
                </div>
            )}
        </div>
    );
};