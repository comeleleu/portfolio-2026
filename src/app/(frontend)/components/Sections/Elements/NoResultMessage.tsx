import { t } from '@utils/getTranslations';
import { Icon } from "@components/Common/Icon";

type NoResultMessageProps = {
    message?: string;
};

export const NoResultMessage = async ({
    message,
}: NoResultMessageProps) => {
    const noResult = await t('general.noResult');
    
    return (
        <div className="flex items-center gap-4 px-6 py-3 text-sm font-semibold text-zinc-400 bg-zinc-500/10 backdrop-blur-md border rounded-full border-zinc-300/10">
            <Icon name="faMagnifyingGlass" className="text-lg" />
            {message || noResult}
        </div>
    );
};