import { GlowingCard } from "./GlowingCard";
import { SectionHeader } from "./SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

export const Projects = async () => {
    let projects: any[] = [];
    try {
        // Query Payload directly to avoid HTTP roundtrip and relative URL issues
        const payload = (await import('payload')).default;
        // Ensure Payload is initialized with the local config when running inside Next
        if (!((payload as any).collections && Object.keys((payload as any).collections).length)) {
            try {
                const config = (await import('@payload-config')).default;
                if (process.env.NODE_ENV === 'development') console.log('Initializing Payload with local config (server-side)');
                await (payload as any).init({ config });
            } catch (initErr) {
                if (process.env.NODE_ENV === 'development') console.warn('Payload init skipped or failed:', initErr);
            }
        }

        const result = await payload.find({ collection: 'projects', limit: 100, depth: 1, overrideAccess: true });
        projects = result?.docs || [];
    } catch (err) {
        console.error('Error fetching projects', err);
    }

    return (
        <section id="projects">
            <SectionHeader
                title="Projects"
                links={[
                    {
                        url: "https://github.com/comeleleu",
                        label: "Open-Source projects",
                        icon: faGithub,
                    },
                ]}
            />

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 *:mb-6 mb-8">
                {projects.length > 0 ? (
                    projects.map((project: any) => (
                        <GlowingCard key={project.id ?? project._id ?? project.title} glowingBorderColor="bg-linear-to-r from-lime-400 via-teal-400 to-sky-300">
                            <div className="flex flex-col gap-4 p-6">
                                <h3 className="flex items-center gap-4 text-2xl font-semibold text-neutral-200">
                                    {project.title}
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="inline-block text-xs text-neutral-400/50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" />
                                </h3>
                                <p className="text-md font-semibold text-emerald-500">{project.context}</p>
                                <p className="text-sm text-neutral-400">{project.description}</p>
                                <ul className="flex flex-row flex-wrap gap-2">
                                    {(project.tags || []).map((tag: any, idx: number) => {
                                        const tagText = typeof tag === 'string' ? tag : tag?.name ?? `tag-${idx}`;
                                        return (
                                            <li key={tagText} className="px-4 py-2 text-xs text-neutral-500 bg-neutral-500/10 backdrop-blur-lg border border-neutral-500/10 rounded-full">{tagText}</li>
                                        );
                                    })}
                                </ul>
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