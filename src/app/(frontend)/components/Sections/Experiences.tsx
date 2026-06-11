import { unstable_cache } from "next/cache";
import { formatDate } from "@utils/formatDate";
import { getLocale, type Locale } from '@utils/getLocale';
import { getPayload } from "@utils/getPayload";
import { t } from '@utils/getTranslations';
import { GlowingCard } from "@components/Cards/GlowingCard";
import { Badge } from "@components/Cards/Elements/Badge";
import { TitleImage } from "@components/Cards/Elements/TitleImage";
import { Tags } from "@components/Cards/Elements/Tags";
import { Description } from "@components/Common/Description";
import { Icon } from "@components/Common/Icon";
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
    async (locale: Locale) => {
        const payload = await getPayload();
        const result = await payload.find({
            collection: 'experiences',
            locale: locale,
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
        tags: ['experiences', 'companies', 'medias', 'links', 'tags']
    }
);

export const Experiences = async ({ sectionParameters }: { sectionParameters: any }) => {
    const locale = await getLocale();
    let experiences: any[] = [];

    const noResult = await t('experiences.noResult');
    
    try {
        experiences = await getCachedExperiences(locale);
    } catch (err) {
        console.error(await t('experiences.fetchingFailed'), err);
    }

    return (
        <section id="experiences" className="scroll-mt-16 md:scroll-mt-0">
            <SectionHeader
                title={sectionParameters?.title || await t('experiences.title')}
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
                                    link={experience.link ?? experience.company?.link}
                                >
                                    <div className="relative flex flex-col gap-4 sm:gap-6 p-4 sm:px-6 md:px-8 md:py-6">
                                        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 md:gap-6">
                                            <Badge
                                                label={`${formatDate(experience.startDate, 'short')} — ${experience.currentWork ? "Today" : formatDate(experience.endDate, 'short')}`}
                                                labelHover={`${formatDate(experience.startDate, 'long')} to ${experience.currentWork ? "Today" : formatDate(experience.endDate, 'long')}`}
                                                textColor="text-indigo-400"
                                                backgroundColor="bg-indigo-600/10"
                                                borderColor="border-indigo-300/10"
                                            />
                                            <div className="flex flex-row-reverse md:flex-row items-center gap-2">
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
                                        <TitleImage
                                            title={experience.title}
                                            subtitle={experience.company.name}
                                            isLink={!!(experience.link?.url ?? experience.company?.link?.url)}
                                            subtitleColor="text-indigo-400"
                                            imageUrl={experience.company?.logo?.url}
                                            imageAlt={experience.company?.logo?.alt || experience.company?.name}
                                        >
                                            <p className="flex items-center gap-1">
                                                <Icon name="faLocationDot" className="text-sm" />
                                                {experience.company.location}
                                            </p>
                                        </TitleImage>
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
                                    <div className="flex items-center text-sm font-semibold text-zinc-400 before:w-12 sm:before:w-18 md:before:w-24 lg:before:w-32 before:shrink-0 before:border-t before:border-dashed before:border-zinc-500/90 before:me-6">
                                        <div className="flex items-center gap-3">
                                            <Icon name="faTruck" className="text-lg" />
                                            <span className="relative after:content-[''] after:absolute after:h-0.5 after:w-4/5 after:bg-indigo-500 after:rounded-full after:-bottom-0.5 after:-left-1">
                                                <span className="hidden md:inline">{t('experiences.movedTo')} </span>
                                                {experience.location}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <NoResultMessage message={noResult} />
            )}
        </section>
    );
};