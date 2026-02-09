import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

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
            <h3 className="flex items-center gap-4 text-2xl font-semibold text-neutral-200">
                {title}
                {isLink && (
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="inline-block text-xs text-neutral-400/20 group-hover:text-neutral-400/50 transition-all ease-in-out duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5" />
                )}
            </h3>
            {(subtitle || children) && (
                <div className={`flex items-baseline gap-8 ${subtitleColor}`}>
                    {subtitle &&
                        <p className="text-md font-semibold">{subtitle}</p>
                    }
                    {children}
                </div>
            )}
        </div>
    );
};