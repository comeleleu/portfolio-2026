import Image from "next/image";
import { t } from '@utils/getTranslations';
import { GlowingCard } from "@components/Cards/GlowingCard";
import { Description } from "@components/Common/Description";

export const About = async ({ sectionParameters }: { sectionParameters: any }) => {
    const {
        fullname = await t('about.fullname'),
        jobTitle = await t('about.jobTitle'),
        description,
        profilePicture,
        glowingBorderColor,
    } = sectionParameters;

    const profilePictureUrl = profilePicture?.url;
    const profilePictureAlt = profilePicture?.alt || await t('about.profilePictureAlt');

    return (
        <section id="about" className="scroll-mt-32 md:scroll-mt-0 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-16 pt-6 md:pt-10">
        <div className="flex flex-col gap-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-zinc-100">{fullname}</h1>
            <p className="is-title text-2xl font-semibold text-zinc-300 mb-4">{jobTitle}</p>
            <Description text={description} textSize="text-md" />
        </div>
        {profilePictureUrl && (
            <div className="self-start lg:sticky lg:top-10 w-2/3 lg:w-full mx-auto">
            <GlowingCard glowingBorderColor={glowingBorderColor || undefined}>
                <Image 
                src={profilePictureUrl} 
                alt={profilePictureAlt} 
                width={profilePicture?.width || 400} 
                height={profilePicture?.height || 400} 
                className="w-full max-h-96 object-cover brightness-85" 
                />
            </GlowingCard>
            </div>
        )}
        </section>
    );
};