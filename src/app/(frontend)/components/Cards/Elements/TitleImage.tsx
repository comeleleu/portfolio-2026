import { ReactNode } from "react";
import Image from "next/image";
import { Title } from "@components/Cards/Elements/Title";

type TitleImageProps = {
    title: string;
    subtitle?: string;
    isLink?: boolean;
    subtitleColor?: string;
    imageUrl?: string | null;
    imageAlt?: string | null;
    children?: ReactNode;
};

export const TitleImage = ({
    title,
    subtitle,
    isLink = false,
    subtitleColor = "text-indigo-500",
    imageUrl,
    imageAlt,
    children
}: TitleImageProps) => {
    return (
        <div className="flex flex-row gap-4 items-start">
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={imageAlt || title}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-contain rounded-xl"
                />
            )}
            <Title
                title={title}
                subtitle={subtitle}
                isLink={isLink}
                subtitleColor={subtitleColor}
            >
                {children}
            </Title>
        </div>
    );
};
