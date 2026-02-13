import { GlowingCard } from "@components/Cards/GlowingCard";
import { Title } from "@components/Cards/Blocks/Title";
import { Description } from "@components/Cards/Blocks/Description";
import { Tags } from "@components/Cards/Blocks/Tags";
import { SectionHeader } from "@components/Sections/Blocks/SectionHeader";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { getPayload } from "@utils/getPayload";

export const Projects = async () => {
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

    return (
        <section id="projects">
            <SectionHeader
                title="Projects"
                color="bg-emerald-500"
                links={[
                    {
                        url: "https://github.com/comeleleu",
                        label: "Open-Source projects",
                        icon: faGithub,
                    },
                ]}
            />
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
                {projects.length > 0 ? (
                    projects.map((project: any) => (
                        <GlowingCard
                            key={project.id ?? project._id ?? project.title}
                            glowingBorderColor="bg-linear-to-r from-lime-400 via-teal-400 to-sky-300"
                            url={project.url}
                        >
                            <div className="flex flex-col gap-6 p-6">
                                <Title
                                    title={project.title}
                                    subtitle={project.context}
                                    isLink={!!project.url}
                                    subtitleColor="text-emerald-500"
                                />
                                <Description text={project.description} />
                                <Tags
                                    tags={project.tags}
                                    maxTags={2}
                                    color="text-emerald-500 bg-emerald-600/10 border-emerald-400/10 hover:bg-emerald-500/20"
                                />
                            </div>
                        </GlowingCard>
                ))
                ) : (
                    <p className="text-sm text-neutral-400">No project found</p>
                )}
            </div>
        </section>
    );
}