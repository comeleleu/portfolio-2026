import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type BadgeProps = {
    label: string;
    labelHover?: string;
    textColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    icon?: IconProp;
};

export const Badge = ({
    label,
    labelHover,
    textColor = "text-neutral-400",
    backgroundColor = "bg-neutral-500/10",
    borderColor = "border-neutral-300/10",
    icon
}: BadgeProps) => {
    return (
        <div
            title={labelHover}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold ${textColor} ${backgroundColor} backdrop-blur-sm border rounded-full ${borderColor} ${labelHover ? "cursor-help" : ""}`}
        >
            {icon && <FontAwesomeIcon icon={icon} className="text-sm" />}
            {label}
        </div>
    );
};