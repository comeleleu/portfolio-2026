import * as Fab from "@fortawesome/free-brands-svg-icons";
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { getPayload } from "@utils/getPayload";
import { GlowingCard } from "@components/Cards/GlowingCard";
import { Title } from "@components/Cards/Elements/Title";
import { Tags } from "@components/Cards/Elements/Tags";
import { Description } from "@components/Common/Description";
import { SectionHeader } from "@components/Sections/Elements/SectionHeader";
import { NoResultMessage } from "@components/Sections/Elements/NoResultMessage";

export const Projects = async ({ sectionParameters }: { sectionParameters: any }) => {
    let projects: any[] = [];
    try {
        const payload = await getPayload();
        const result = await payload.find({
            collection: 'projects',
            limit: 100,
            depth: 1,
            overrideAccess: true,
            where: {
                published: { equals: true },
            },
        });
        projects = result?.docs || [];
    } catch (err) {
        console.error('Error fetching projects', err);
    }

    const headerLinks = sectionParameters?.links?.map((link: any) => ({
        id: link.id,
        label: link.label,
        url: link.url,
        external: link.external,
        icon: (Fas as any)[link.icon] || (Fab as any)[link.icon] || Fas.faLink
    })) || [];

    return (
        <section id="projects" className="scroll-mt-16 sm:scroll-mt-0">
            <SectionHeader
                title={sectionParameters?.title || "Projects"}
                sectionIcon={Fas.faFolderOpen}
                afterColor="after:bg-cyan-500"
                links={headerLinks}
            />
            {projects.length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 *:mb-4">
                    {projects.map((project: any) => (
                        <GlowingCard
                            key={project.id ?? project._id ?? project.title}
                            glowingBorderColor="bg-linear-to-r from-emerald-200 via-cyan-400 to-blue-400"
                            url={project.url}
                        >
                            <div className="flex flex-col gap-6 p-6">
                                <Title
                                    title={project.title}
                                    subtitle={project.context}
                                    isLink={!!project.url}
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
                    ))}
                </div>
            ) : (
                <NoResultMessage message="No projects found" />
            )}
        </section>
    );
}