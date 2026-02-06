import { GlowingCard } from "./GlowingCard";
import { SectionHeader } from "./SectionHeader";
import { Description } from "./Cards/Description";
import { Title } from "./Cards/Title";
import { Tags } from "./Cards/Tags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

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
                        <div className="flex flex-col gap-6 p-6">
                            <Title
                                title={project.title}
                                subtitle={project.context}
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
                ))}
            </div>
        </section>
    );
}