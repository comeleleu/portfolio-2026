import { GlowingCard } from "@components/Cards/GlowingCard";
import { Description } from "@components/Common/Description";

export const About = ({ sectionParameters }: { sectionParameters: any }) => {
    const {
        fullname = 'Côme Leleu',
        jobTitle = 'Web developer',
        description,
        profilePicture,
        glowingBorderColor
    } = sectionParameters;
    const profilePictureUrl = profilePicture?.url;
    const profilePictureAlt = profilePicture?.alt || fullname;

    return (
        <section id="about" className="scroll-mt-32 sm:scroll-mt-0 grid grid-cols-1 md:grid-cols-[1fr_200px] lg:grid-cols-[1fr_300px] gap-16 pt-6 sm:pt-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-8xl font-bold text-neutral-100">{fullname}</h1>
                <h2 className="text-4xl text-neutral-300 mb-6 indent-8">{jobTitle}</h2>
                <Description text={description} />
            </div>
            {profilePictureUrl && (
                <div className="self-start md:sticky md:top-10">
                    <GlowingCard glowingBorderColor={glowingBorderColor || undefined}>
                        <img src={profilePictureUrl} alt={profilePictureAlt} className="w-full max-h-96 object-cover brightness-85" />
                    </GlowingCard>
                </div>
            )}
        </section>
    );
};