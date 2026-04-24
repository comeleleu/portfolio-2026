import { unstable_cache } from "next/cache";
import { formatDate } from "@utils/formatDate";
import { getPayload } from "@utils/getPayload";
import { GlowingCard } from "@components/Cards/GlowingCard";
import { Badge } from "@components/Cards/Elements/Badge";
import { Tags } from "@components/Cards/Elements/Tags";
import { Title } from "@components/Cards/Elements/Title";
import { Description } from "@components/Common/Description";
import { SectionHeader } from "@components/Sections/Elements/SectionHeader";
import { NoResultMessage } from "@components/Sections/Elements/NoResultMessage";

const getCachedProjects = unstable_cache(
    async () => {
        const payload = await getPayload();
        const result = await payload.find({
            collection: 'projects',
            limit: 100,
            depth: 1,
            overrideAccess: true,
            where: {
                published: { equals: true },
            },
            sort: ['-startDate', '-endDate'],
        });
        return result?.docs || [];
    },
    ['projects-list'],
    {
        tags: ['projects', 'tags']
    }
);

export const Projects = async ({ sectionParameters }: { sectionParameters: any }) => {
    let projects: any[] = [];
    try {
        projects = await getCachedProjects();
    } catch (err) {
        console.error('Error fetching projects', err);
    }

    return (
        <section id="projects" className="scroll-mt-16 sm:scroll-mt-0">
            <SectionHeader
                title={sectionParameters?.title || "Projects"}
                sectionIcon="faFolderOpen"
                afterColor="after:bg-linear-to-r/oklch after:from-blue-400 after:to-cyan-400 after:to-70%"
                links={sectionParameters?.links}
            />
            {projects.length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 *:mb-4">
                    {projects.map((project: any) => {
                        const {startDate, endDate, currentProject} = project;

                        const startDateShort = startDate ? formatDate(startDate, 'short') : '';
                        const endDateShort = currentProject ? "Today" : (endDate ? formatDate(endDate, 'short') : '');

                        let dateLabel = startDateShort || endDateShort;
                        let dateLabelHover = startDateShort || endDateShort;

                        if (startDateShort && endDateShort && startDateShort !== endDateShort) {
                            dateLabel = `${startDateShort} — ${endDateShort}`;
                            dateLabelHover = `${startDateShort} to ${endDateShort}`;
                        }

                        return (
                            <GlowingCard
                                key={project.id ?? project._id ?? project.title}
                                glowingBorderColor="bg-linear-to-r/oklch from-emerald-200 via-cyan-400 to-blue-400"
                                link={project.link}
                            >
                                <div className="flex flex-col gap-6 p-6">
                                    {dateLabel && (
                                        <div className="flex">
                                            <Badge
                                                label={dateLabel}
                                                labelHover={dateLabelHover}
                                                textColor="text-cyan-400"
                                                backgroundColor="bg-cyan-600/10"
                                                borderColor="border-cyan-300/10"
                                            />
                                        </div>
                                    )}
                                    <Title
                                        title={project.title}
                                        subtitle={project.context}
                                        isLink={!!project.link?.url}
                                        subtitleColor="text-cyan-500"
                                    />
                                    <Description text={project.description} />
                                    <Tags
                                        tags={project.tags}
                                        maxTags={2}
                                        textColor="text-cyan-400 hover:text-cyan-300"
                                        backgroundColor="bg-cyan-600/15 hover:bg-cyan-500/15"
                                        borderColor="border-cyan-400/15 hover:border-cyan-300/20"
                                    />
                                </div>
                            </GlowingCard>
                        );
                    })}
                </div>
            ) : (
                <NoResultMessage message="No projects found" />
            )}
        </section>
    );
}