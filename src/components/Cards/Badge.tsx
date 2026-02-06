import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type BadgeProps = {
    label: string;
    labelHover?: string;
    color?: string;
    icon?: string;
};

export const Badge = ({
    label,
    labelHover,
    color = "text-neutral-500 bg-neutral-600/10 border-neutral-400/10",
    icon
}: BadgeProps) => {
    return (
        <div
            title={labelHover}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold backdrop-blur-lg border rounded-full ${labelHover ? "cursor-help" : ""} ${color}`}
        >
            {icon && <FontAwesomeIcon icon={icon} className="text-xs" />} 
            {label}
        </div>
    );
};