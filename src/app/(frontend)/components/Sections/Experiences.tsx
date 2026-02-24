import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Fab from "@fortawesome/free-brands-svg-icons";
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { getPayload } from "@utils/getPayload";
import { formatDate } from "@utils/formatDate";
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
            return Fas.faHouseLaptop;
        case "Hybrid":
            return Fas.faLaptop;
        case "On-site":
            return Fas.faBuilding;
        default:
            return Fas.faLaptop;
    }
};

export const Experiences = async ({ sectionParameters }: { sectionParameters: any }) => {
    let experiences: any[] = [];
    try {
        const payload = await getPayload();
        const result = await payload.find({
            collection: 'experiences',
            limit: 100,
            depth: 1,
            overrideAccess: true,
            where: {
                published: { equals: true },
            },
        });
        experiences = result?.docs || [];
    } catch (err) {
        console.error('Error fetching experiences', err);
    }

    const headerLinks = sectionParameters?.links?.map((link: any) => ({
        url: link.url,
        label: link.label,
        icon: (Fas as any)[link.icon] || (Fab as any)[link.icon] || Fas.faLink
    })) || [];

    return (
        <section id="experiences">
            <SectionHeader
                title={sectionParameters?.title || "Experiences"}
                links={headerLinks}
            />

            {experiences.length > 0 ? (
                <div className="flex flex-col gap-4 mb-4">
                    {experiences.map((experience: any) => (
                        <GlowingCard
                            key={experience.id ?? experience._id ?? experience.title}
                            url={experience.url}
                        >
                            <div className="relative flex flex-col gap-6 p-6">
                                <div className="flex flex-row justify-between items-center gap-6">
                                    <Badge
                                        label={`${formatDate(experience.startDate, 'short')} — ${experience.currentWork ? "Today" : formatDate(experience.endDate, 'short')}`}
                                        labelHover={`${formatDate(experience.startDate, 'long')} to ${experience.currentWork ? "Today" : formatDate(experience.endDate, 'long')}`}
                                        color="text-indigo-500 bg-indigo-600/10 border-indigo-400/10"
                                    />
                                    <div className="flex items-center gap-2">
                                        {experience.selfEmployed && (
                                            <Badge
                                                label="Self-employed"
                                                icon={Fas.faAddressCard}
                                            />
                                        )}
                                        <Badge
                                            label={experience.locationType}
                                            icon={getLocationIcon(experience.locationType)}
                                        />
                                    </div>
                                </div>
                                <Title
                                    title={experience.title}
                                    subtitle={experience.company.name}
                                    isLink={!!experience.url}
                                >
                                    <p className="flex items-baseline gap-2 text-sm">
                                        <FontAwesomeIcon icon={Fas.faLocationDot} className="text-xs" />
                                        {experience.company.location}
                                    </p>
                                </Title>
                                <Description text={experience.description} />
                                <Tags
                                    tags={experience.tags}
                                    color="text-indigo-500 bg-indigo-600/10 border-indigo-400/10 hover:bg-indigo-500/20"
                                />
                            </div>
                        </GlowingCard>
                    ))}
                </div>
            ) : (
                <NoResultMessage message="No experiences found" />
            )}

        </section>
    );
};