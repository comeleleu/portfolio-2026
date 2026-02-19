import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type NoResultMessageProps = {
    message?: string;
};

export const NoResultMessage = ({
    message = "No result found.",
}: NoResultMessageProps) => {
    return (
        <div className="flex items-center gap-4 px-6 py-3 text-sm font-semibold backdrop-blur-lg border rounded-full text-neutral-500 bg-neutral-700/10 border-neutral-500/10">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
            {message}
        </div>
    );
};