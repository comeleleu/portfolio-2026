import { GlowingCard } from "./GlowingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faBuilding, faCircleChevronRight, faLaptop, faHouseLaptop, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const getLocationIcon = (locationType: string) => {
    switch (locationType) {
        case "Remote":
            return faHouseLaptop;
        case "Hybrid":
            return faLaptop;
        case "On-site":
            return faBuilding;
        default:
            return faLaptop;
    }
};

export const Experiences = () => {
    const experiences = [
        {
            startDate: "Nov. 2019",
            endDate: null,
            title: "Ingénieur Frontend Senior, Accessibilité",
            company: "Klaviyo",
            companyLocation: "Boston, MA",
            locationType: "Remote",
            description: "Construction et maintenance de composants critiques utilisés pour construire le frontend de Klaviyo, sur l'ensemble du produit. Travail en étroite collaboration avec des équipes interfonctionnelles, y compris les développeurs, les concepteurs et les chefs de produit, pour mettre en œuvre et défendre les meilleures pratiques en matière d'accessibilité Web.",
            tags: ["JavaScript", "TypeScript", "React", "Storybook"],
        },
        {
            startDate: "Juil. 2018",
            endDate: "Oct. 2019",
            title: "Développeur Full-Stack",
            company: "SuperCorp",
            companyLocation: "Québec, QC",
            locationType: "Hybrid",
            description: "Développement et maintenance d'applications web pour divers clients. J'ai travaillé sur des projets variés, de la création de sites vitrines à des applications web complexes.",
            tags: ["PHP", "Symfony", "JavaScript", "jQuery", "MySQL"],
        },
        {
            startDate: "Mar. 2017",
            endDate: "Jun. 2018",
            title: "Développeur Front-End",
            company: "MegaStartup",
            companyLocation: "Montréal, QC",
            locationType: "On-site",
            description: "Intégration de maquettes et développement de nouvelles fonctionnalités pour la plateforme principale de la startup. Optimisation des performances et de l'expérience utilisateur.",
            tags: ["HTML5", "CSS3", "Sass", "Vue.js", "Webpack"],
        },
    ];

    return (
        <section id="experiences">
            <h2 className="text-3xl text-neutral-400 font-semibold mb-8">Experiences</h2>
            <div className="flex flex-col gap-6 mb-6">
                {experiences.map((experience) => (
                    <GlowingCard key={experience.title}>
                        <div className="relative flex flex-col gap-4 p-6">
                            <div className="flex flex-row justify-between items-center gap-6">
                                <div className="px-4 py-2 text-xs text-indigo-500 bg-indigo-500/10 backdrop-blur-lg border border-indigo-500/10 rounded-full">{experience.startDate} - {experience.endDate ?? "Aujourd'hui"}</div>
                                <div className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-600 font-semibold bg-neutral-600/10 backdrop-blur-lg border border-neutral-500/10 rounded-full">
                                    <FontAwesomeIcon icon={getLocationIcon(experience.locationType)} className="text-xs" />
                                    {experience.locationType}
                                </div>
                            </div>
                            <h3 className="flex items-center gap-4 text-2xl font-semibold text-neutral-200">
                                {experience.title}
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="inline-block text-xs text-neutral-400/50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" />
                            </h3>
                            <div className="flex items-baseline gap-6 text-indigo-500">
                                <p className="text-md font-semibold">{experience.company}</p>
                                <p className="flex items-baseline gap-1 text-sm">
                                    <FontAwesomeIcon icon={faLocationDot} className="text-xs" />
                                    {experience.companyLocation}
                                </p>
                                
                            </div>
                            <p className="text-sm text-neutral-400">{experience.description}</p>
                            <ul className="flex flex-row flex-wrap gap-2">
                                {experience.tags.map((tag) => (
                                    <li key={tag} className="px-4 py-2 text-xs text-neutral-500 bg-neutral-500/10 backdrop-blur-lg border border-neutral-500/10 rounded-full">{tag}</li>
                                ))}
                            </ul>
                        </div>
                    </GlowingCard>
                ))}
            </div>
            <div className="group inline-flex w-max items-center gap-2 px-4 py-2 text-md text-indigo-500 bg-indigo-500/10 backdrop-blur-lg border border-indigo-500/10 rounded-full">
                Voir toutes les expériences
                <FontAwesomeIcon icon={faCircleChevronRight} className="inline-block text-lg text-indigo-400/50 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1" />
            </div>

        </section>
    );
};