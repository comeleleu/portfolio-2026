import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { getPayload } from "@utils/getPayload";
import { formatDate } from "@utils/formatDate";
import { GlowingCard } from "@components/Cards/GlowingCard";
import { Badge } from "@components/Cards/Elements/Badge";
import { Title } from "@components/Cards/Elements/Title";
import { Tags } from "@components/Cards/Elements/Tags";
import { Description } from "@components/Common/Description";
import { NoResultMessage } from "@components/Sections/Elements/NoResultMessage";

export const Studies = async ({ sectionParameters }: { sectionParameters: any }) => {
    let studies: any[] = [];
    try {
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
        studies = result?.docs || [];
    } catch (err) {
        console.error('Error fetching studies', err);
    }

    return (
        <section id="studies" className="scroll-mt-16 sm:scroll-mt-0">

            <div className="flex items-center my-8 font-semibold text-zinc-400 before:flex-1 before:border-t before:border-dashed before:border-zinc-500/90 before:me-8 after:flex-1 after:border-t after:border-dashed after:border-zinc-500/90 after:ms-8">
                <div className="flex items-center gap-4 text-xl">
                    <FontAwesomeIcon icon={Fas.faGraduationCap} />
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
                            url={study.url ?? study.school?.url}
                        >
                            <div className="relative flex flex-col gap-6 px-8 py-6">
                                <div className="flex flex-row justify-between items-center gap-6">
                                    <Badge
                                        label={`${formatDate(study.startDate, 'short')} — ${study.currentStudy ? "Today" : formatDate(study.endDate, 'short')}`}
                                        labelHover={`${formatDate(study.startDate, 'long')} to ${study.currentStudy ? "Today" : formatDate(study.endDate, 'long')}`}
                                        textColor="text-blue-400"
                                        backgroundColor="bg-blue-600/10"
                                        borderColor="border-blue-300/10"
                                    />
                                    <Badge
                                        label={`${study.level} — ${study.field}`}
                                        icon={Fas.faGraduationCap}
                                    />
                                </div>
                                <div className="flex flex-row gap-4 items-start">
                                    {study.school?.logo?.url && (
                                        <img
                                            src={study.school.logo.url}
                                            alt={study.school.logo.alt || study.school.name}
                                            className="w-14 h-14 object-contain rounded-xl"
                                        />
                                    )}
                                    <Title
                                        title={study.degree}
                                        subtitle={study.school.name}
                                        isLink={!!(study.url ?? study.school?.url)}
                                        subtitleColor="text-blue-500"
                                    >
                                        <p className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={Fas.faLocationDot} className="text-md" />
                                            {study.school.location}
                                        </p>
                                    </Title>
                                </div>
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