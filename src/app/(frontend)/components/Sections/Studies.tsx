import { unstable_cache } from "next/cache";
import { formatDate } from "@utils/formatDate";
import { getPayload } from "@utils/getPayload";
import { GlowingCard } from "@components/Cards/GlowingCard";
import { Badge } from "@components/Cards/Elements/Badge";
import { TitleImage } from "@components/Cards/Elements/TitleImage";
import { Tags } from "@components/Cards/Elements/Tags";
import { Description } from "@components/Common/Description";
import { Icon } from "@components/Common/Icon";
import { NoResultMessage } from "@components/Sections/Elements/NoResultMessage";

const getCachedStudies = unstable_cache(
    async () => {
        const payload = await getPayload();
        const result = await payload.find({
            collection: 'studies',
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
    ['studies-list'],
    {
        tags: ['studies', 'schools', 'tags', 'medias']
    }
);

export const Studies = async ({ sectionParameters }: { sectionParameters: any }) => {
    let studies: any[] = [];
    try {
        studies = await getCachedStudies();
    } catch (err) {
        console.error('Error fetching studies', err);
    }

    return (
        <section id="studies" className="scroll-mt-16 sm:scroll-mt-0">

            <div className="flex items-center my-8 font-semibold text-zinc-400 before:flex-1 before:border-t before:border-dashed before:border-zinc-500/90 before:me-8 after:flex-1 after:border-t after:border-dashed after:border-zinc-500/90 after:ms-8">
                <div className="flex items-center gap-4 text-xl">
                    <Icon name="faGraduationCap" />
                    <div className="is-title">
                        {sectionParameters?.title || "Studies"}
                    </div>
                </div>
            </div>

            {studies.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {studies.map((study: any) => (
                        <GlowingCard
                            key={study.id ?? study._id ?? study.degree}
                            glowingBorderColor="bg-linear-to-r/oklch from-cyan-400 via-blue-400 to-violet-400"
                            link={study.link ?? study.school?.link}
                        >
                            <div className="relative flex flex-col gap-6 px-8 py-6">
                                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 md:gap-6">
                                    <Badge
                                        label={`${formatDate(study.startDate, 'short')} — ${study.currentStudy ? "Today" : formatDate(study.endDate, 'short')}`}
                                        labelHover={`${formatDate(study.startDate, 'long')} to ${study.currentStudy ? "Today" : formatDate(study.endDate, 'long')}`}
                                        textColor="text-blue-400"
                                        backgroundColor="bg-blue-600/10"
                                        borderColor="border-blue-300/10"
                                    />
                                    <Badge
                                        label={`${study.level} — ${study.field}`}
                                        icon="faGraduationCap"
                                    />
                                </div>
                                <TitleImage
                                    title={study.degree}
                                    subtitle={study.school.name}
                                    isLink={!!(study.link?.url ?? study.school?.link?.url)}
                                    subtitleColor="text-blue-500"
                                    imageUrl={study.school?.logo?.url}
                                    imageAlt={study.school?.logo?.alt || study.school?.name}
                                >
                                    <p className="flex items-center gap-2">
                                        <Icon name="faLocationDot" className="text-md" />
                                        {study.school.location}
                                    </p>
                                </TitleImage>
                                <Description text={study.description} />
                                <Tags
                                    tags={study.tags}
                                    textColor="text-blue-400 hover:text-blue-300"
                                    backgroundColor="bg-blue-600/15 hover:bg-blue-500/20"
                                    borderColor="border-blue-400/15 hover:border-blue-300/20"
                                />
                            </div>
                        </GlowingCard>
                    ))}
                </div>
            ) : (
                <NoResultMessage message="No studies found" />
            )}
        </section>
    );
};