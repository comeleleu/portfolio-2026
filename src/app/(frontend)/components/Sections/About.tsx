import { GlowingCard } from "@components/Cards/GlowingCard";
import { Description } from "@components/Common/Description";

export const About = ({ sectionParameters }: { sectionParameters: any }) => {
    const {
        fullname = 'Côme Leleu',
        jobTitle = 'Web developer',
        description,
        profilePicture
    } = sectionParameters;
    const profilePictureUrl = profilePicture?.url;
    const profilePictureAlt = profilePicture?.alt || fullname;

    return (
        <section id="about" className="grid grid-cols-1 md:grid-cols-[1fr_200px] lg:grid-cols-[1fr_300px] gap-16">
            <div className="flex flex-col gap-2">
                <h1 className="text-8xl font-bold text-neutral-100">{fullname}</h1>
                <h2 className="text-4xl text-neutral-400 mb-6 indent-8">{jobTitle}</h2>
                <Description text={description} />
            </div>
            {profilePictureUrl && (
                <div className="self-start md:sticky md:top-10">
                    <GlowingCard glowingBorderColor="bg-linear-to-r from-orange-300 via-yellow-400 to-emerald-300">
                        <img src={profilePictureUrl} alt={profilePictureAlt} className="w-full max-h-96 object-cover brightness-85" />
                    </GlowingCard>
                </div>
            )}
        </section>
    );
};