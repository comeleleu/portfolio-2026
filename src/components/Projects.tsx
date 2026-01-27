import { GlowingCard } from "./GlowingCard";
import { SectionHeader } from "./SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

export const Projects = () => {
    const projects = [
        {
            title: "Titre du Projet 1",
            description: "Courte description du projet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Courte description du projet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Courte description du projet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Courte description du projet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Courte description du projet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Courte description du projet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Courte description du projet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            context: "Projet personnel",
            tags: ["React", "Next.js", "Tailwind CSS"],
            url: "#",
        },
        {
            title: "Titre du Projet 2",
            description: "Une autre description pour un projet différent, un peu plus longue pour voir comment le texte se comporte.",
            context: "Projet open-source",
            tags: ["TypeScript", "Node.js", "Express"],
            url: "#",
        },
        {
            title: "Titre du Projet 3",
            description: "Description pour le troisième projet, montrant la dynamicité et la façon dont les cartes s'adaptent.",
            context: "Projet professionnel",
            tags: ["SvelteKit", "Prisma", "PostgreSQL"],
            url: "#",
        },
        {
            title: "Titre du Projet 4",
            description: "Quatrième projet avec une description concise. Lorem ipsum dolor sit amet.",
            context: "Projet personnel",
            tags: ["Vue.js", "Firebase", "Vuetify", "Tailwind CSS", "GraphQL"],
            url: "#",
        },
    ];

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
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [&>*]:mb-6 mb-8">
                {projects.map((project) => (
                    <GlowingCard key={project.title} glowingBorderColor="bg-linear-to-r from-lime-400 via-teal-400 to-sky-300">
                        <div className="flex flex-col gap-4 p-6">
                            <h3 className="flex items-center gap-4 text-2xl font-semibold text-neutral-200">
                                {project.title}
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="inline-block text-xs text-neutral-400/50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" />
                            </h3>
                            <p className="text-md font-semibold text-emerald-500">{project.context}</p>
                            <p className="text-sm text-neutral-400">{project.description}</p>
                            <ul className="flex flex-row flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <li key={tag} className="px-4 py-2 text-xs text-neutral-500 bg-neutral-500/10 backdrop-blur-lg border border-neutral-500/10 rounded-full">{tag}</li>
                                ))}
                            </ul>
                        </div>
                    </GlowingCard>
                ))}
            </div>
        </section>
    );
}