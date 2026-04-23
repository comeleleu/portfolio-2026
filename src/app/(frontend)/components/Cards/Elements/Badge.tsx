import { Icon } from "@components/Common/Icon";

type BadgeProps = {
    label: string;
    labelHover?: string;
    textColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    icon?: string;
};

export const Badge = ({
    label,
    labelHover,
    textColor = "text-zinc-400",
    backgroundColor = "bg-zinc-500/10",
    borderColor = "border-zinc-300/10",
    icon
}: BadgeProps) => {
    return (
        <div
            title={labelHover}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold ${textColor} ${backgroundColor} backdrop-blur-sm border rounded-full ${borderColor} ${labelHover ? "cursor-help" : ""}`}
        >
            {icon && (
                <Icon name={icon} className="text-sm" />
            )}
            {label}
        </div>
    );
};