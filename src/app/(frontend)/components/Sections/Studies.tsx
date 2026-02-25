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

export const Studies = async () => {
    let studies: any[] = [];
    try {
        const payload = await getPayload();
        const result = await payload.find({
            collection: 'studies',
            limit: 100,
            depth: 1,
            overrideAccess: true,
            where: {
                published: { equals: true },
            },
        });
        studies = result?.docs || [];
    } catch (err) {
        console.error('Error fetching studies', err);
    }

    return (
        <section id="studies">
            {studies.length > 0 ? (
                <div className="flex flex-col gap-4 mb-4">
                    {studies.map((study: any) => (
                        <GlowingCard
                            key={study.id ?? study._id ?? study.degree}
                            url={study.url}
                        >
                            <div className="relative flex flex-col gap-6 p-6">
                                <div className="flex flex-row justify-between items-center gap-6">
                                    <Badge
                                        label={`${formatDate(study.startDate, 'short')} — ${study.currentStudy ? "Today" : formatDate(study.endDate, 'short')}`}
                                        labelHover={`${formatDate(study.startDate, 'long')} to ${study.currentStudy ? "Today" : formatDate(study.endDate, 'long')}`}
                                        color="text-indigo-500 bg-indigo-600/10 border-indigo-400/10"
                                    />
                                    <Badge
                                        label={`${study.level} — ${study.field}`}
                                        icon={Fas.faGraduationCap}
                                    />
                                </div>
                                <Title
                                    title={study.degree}
                                    subtitle={study.school.name}
                                    isLink={!!study.url}
                                >
                                    <p className="flex items-baseline gap-2 text-sm">
                                        <FontAwesomeIcon icon={Fas.faLocationDot} className="text-xs" />
                                        {study.school.location}
                                    </p>
                                </Title>
                                <Description text={study.description} />
                                <Tags
                                    tags={study.tags}
                                    color="text-indigo-500 bg-indigo-600/10 border-indigo-400/10 hover:bg-indigo-500/20"
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