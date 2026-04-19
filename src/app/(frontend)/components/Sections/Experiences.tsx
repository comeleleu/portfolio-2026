import { unstable_cache } from "next/cache";
import { formatDate } from "@utils/formatDate";
import { getIcon } from "@utils/getIcon";
import { getPayload } from "@utils/getPayload";
import { GlowingCard } from "@components/Cards/GlowingCard";
import { Badge } from "@components/Cards/Elements/Badge";
import { Title } from "@components/Cards/Elements/Title";
import { Tags } from "@components/Cards/Elements/Tags";
import { Description } from "@components/Common/Description";
import { SectionHeader } from "@components/Sections/Elements/SectionHeader";
import { NoResultMessage } from "@components/Sections/Elements/NoResultMessage";

const getLocationIcon = (locationType: string) => {
    switch (locationType) {
        case "Remote":
            return "faHouseLaptop";
        case "Hybrid":
            return "faLaptop";
        case "On-site":
            return "faBuilding";
        default:
            return "faLaptop";
    }
};

const getCachedExperiences = unstable_cache(
    async () => {
        const payload = await getPayload();
        const result = await payload.find({
            collection: 'experiences',
            limit: 100,
            depth: 2,
            overrideAccess: true,
            where: {
                published: { equals: true },
            },
            sort: ['-endDate'],
        });
        return result?.docs || [];
    },
    ['experiences-list'],
    {
        tags: ['experiences', 'companies', 'tags', 'medias']
    }
);

export const Experiences = async ({ sectionParameters }: { sectionParameters: any }) => {
    let experiences: any[] = [];
    try {
        experiences = await getCachedExperiences();
    } catch (err) {
        console.error('Error fetching experiences', err);
    }

    return (
        <section id="experiences" className="scroll-mt-16 sm:scroll-mt-0">
            <SectionHeader
                title={sectionParameters?.title || "Experiences"}
                sectionIcon="faLaptopCode"
                afterColor="after:bg-linear-to-r/oklch after:from-indigo-500 after:to-blue-500 after:from-30%"
                links={sectionParameters?.links}
            />

            {experiences.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {experiences.map((experience: any, index: number) => {
                        const previousExperience = experiences[index + 1];
                        const showLocationChange = previousExperience && experience.location !== previousExperience.location;

                        return (
                            <div key={experience.id ?? experience._id ?? experience.title} className="flex flex-col justify-start gap-4">
                                <GlowingCard
                                    glowingBorderColor="bg-linear-to-r/oklch from-sky-400 via-indigo-400 to-purple-400"
                                    url={experience.url ?? experience.company?.url}
                                >
                                    <div className="relative flex flex-col gap-6 px-8 py-6">
                                        <div className="flex flex-row justify-between items-center gap-6">
                                            <Badge
                                                label={`${formatDate(experience.startDate, 'short')} — ${experience.currentWork ? "Today" : formatDate(experience.endDate, 'short')}`}
                                                labelHover={`${formatDate(experience.startDate, 'long')} to ${experience.currentWork ? "Today" : formatDate(experience.endDate, 'long')}`}
                                                textColor="text-indigo-400"
                                                backgroundColor="bg-indigo-600/10"
                                                borderColor="border-indigo-300/10"
                                            />
                                            <div className="flex items-center gap-2">
                                                {experience.selfEmployed && (
                                                    <Badge
                                                        label="Self-employed"
                                                        icon="faAddressCard"
                                                    />
                                                )}
                                                <Badge
                                                    label={experience.locationType}
                                                    icon={getLocationIcon(experience.locationType)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4 items-start">
                                            {experience.company?.logo?.url && (
                                                <img
                                                    src={experience.company.logo.url}
                                                    alt={experience.company.logo.alt || experience.company.name}
                                                    className="w-14 h-14 object-contain rounded-xl"
                                                />
                                            )}
                                            <Title
                                                title={experience.title}
                                                subtitle={experience.company.name}
                                                isLink={!!(experience.url ?? experience.company?.url)}
                                                subtitleColor="text-indigo-500"
                                            >
                                                <p className="flex items-center gap-2">
                                                    {getIcon("faLocationDot", true, "text-md")}
                                                    {experience.company.location}
                                                </p>
                                            </Title>
                                        </div>
                                        <Description text={experience.description} />
                                        <Tags
                                            tags={experience.tags}
                                            textColor="text-indigo-400 hover:text-indigo-300"
                                            backgroundColor="bg-indigo-600/15 hover:bg-indigo-500/20"
                                            borderColor="border-indigo-400/15 hover:border-indigo-300/20"
                                        />
                                    </div>
                                </GlowingCard>
                                {showLocationChange && (
                                    <div className="w-3/4 sm:w-2/3 md:w-3/5 lg:w-2/5 flex items-center text-sm font-semibold text-zinc-400 before:flex-1 before:border-t before:border-dashed before:border-zinc-500/90 before:me-8">
                                        <div className="flex items-center gap-2">
                                            {getIcon("faTruck", true, "text-lg")}
                                            Moved to {experience.location}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <NoResultMessage message="No experiences found" />
            )}
        </section>
    );
};