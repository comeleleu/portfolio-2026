type DescriptionProps = {
    text: string;
};

export const Description = ({
    text
}: DescriptionProps) => {
    return (
        <p className="text-sm text-neutral-400 indent-8">{text}</p>
    );
};