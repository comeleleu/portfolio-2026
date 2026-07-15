import { unstable_cache } from "next/cache";
import { getTranslations, getLocale } from 'next-intl/server';
import { formatDate } from "@utils/formatDate";
import { getPayload } from "@utils/getPayload";
import { GlowingCard } from "@components/Cards/GlowingCard";
import { Badge } from "@components/Cards/Elements/Badge";
import { TitleImage } from "@components/Cards/Elements/TitleImage";
import { Tags } from "@components/Cards/Elements/Tags";
import { Description } from "@components/Common/Description";
import { Icon } from "@components/Common/Icon";
import { NoResultMessage } from "@components/Sections/Elements/NoResultMessage";

const getCachedStudies = (locale: string) => unstable_cache(
    async () => {
        const payload = await getPayload();
        const result = await payload.find({
            collection: 'studies',
            locale: locale as any,
            limit: 100,
            depth: 2,
            overrideAccess: true,
            where: {
                published: { equals: true }
            },
            sort: ['-endDate'],
        });
        return result?.docs || [];
    },
    [`studies-list-${locale}`],
    {
        tags: ['studies', 'links', 'medias', 'schools', 'tags']
    }
);

export const Studies = async ({ sectionParameters }: { sectionParameters: any }) => {
    const t = await getTranslations();
    const locale = await getLocale();
    let studies: any[] = [];
    
    try {
        studies = await getCachedStudies(locale)();
    } catch (err) {
        console.error(t('studies.fetchingFailed'), err);
    }

    return (
        <section id="studies" className="scroll-mt-14 md:scroll-mt-0">

            <div className="flex items-center my-8 before:flex-1 before:border-t before:border-dashed before:border-zinc-500/90 before:me-8 after:flex-1 after:border-t after:border-dashed after:border-zinc-500/90 after:ms-8">
                <p className="is-title text-xl font-semibold text-zinc-400">
                    <Icon name="faGraduationCap" className="inline-block mr-2.5" />
                    <span className="pl-1
                        bg-underline-rounded pb-1.5 leading-normal
                        [--underline-width:90%] [--underline-height:2px]
                        [--underline-from:var(--color-blue-500)] [--underline-to:var(--color-blue-500)]
                    ">
                        {sectionParameters?.title || t('studies.title')}
                    </span>
                </p>
            </div>

            {studies.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {studies.map(async (study: any) => {
                        const today = (t('general.dateToday')) as string;
                        const dateShort = t('general.dateShort', {
                            startDate: formatDate(study.startDate, 'short', locale),
                            endDate: study.currentStudy ? today : formatDate(study.endDate, 'short', locale)
                        });
                        const dateLong = t(study.currentStudy ? 'general.dateLongToday' : 'general.dateLong', {
                            startDate: formatDate(study.startDate, 'long', locale),
                            endDate: study.currentStudy ? today.toLowerCase() : formatDate(study.endDate, 'long', locale)
                        });

                        return (
                            <GlowingCard
                                key={study.id ?? study._id ?? study.degree}
                                glowingBorderColor="bg-linear-to-r/oklch from-cyan-400 via-blue-400 to-violet-400"
                                link={study.link ?? study.school?.link}
                            >
                                <div className="relative flex flex-col gap-4 sm:gap-6 p-4 sm:px-6 md:px-8 md:py-6">
                                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 md:gap-6">
                                        <Badge
                                            label={dateShort}
                                            labelHover={dateLong}
                                            textColor="text-blue-400"
                                            backgroundColor="bg-blue-600/10"
                                            borderColor="border-blue-300/10"
                                        />
                                        <Badge
                                            label={`${t(`studies.level.${study.level}`)} — ${study.field}`}
                                            icon="faGraduationCap"
                                        />
                                    </div>
                                    <TitleImage
                                        title={study.degree}
                                        subtitle={study.school.name}
                                        isLink={!!(study.link?.url ?? study.school?.link?.url)}
                                        subtitleColor="text-blue-400"
                                        imageUrl={study.school?.logo?.url}
                                        imageAlt={study.school?.logo?.alt || study.school?.name}
                                    >
                                        <p className="flex items-center gap-1">
                                            <Icon name="faLocationDot" className="text-sm" />
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
                        );
                    })}
                </div>
            ) : (
                <NoResultMessage message={t('studies.noResult')} />
            )}
        </section>
    );
};