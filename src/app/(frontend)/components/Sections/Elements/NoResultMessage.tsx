import { getIcon } from "@utils/getIcon";

type NoResultMessageProps = {
    message?: string;
};

export const NoResultMessage = ({
    message = "No results found",
}: NoResultMessageProps) => {
    return (
        <div className="flex items-center gap-4 px-6 py-3 text-sm font-semibold text-zinc-400 bg-zinc-500/10 backdrop-blur-md border rounded-full border-zinc-300/10">
            {getIcon("faMagnifyingGlass", true, "text-lg")}
            {message}
        </div>
    );
};