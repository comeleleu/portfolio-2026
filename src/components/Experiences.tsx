import { GlowingCard } from "./GlowingCard";
import { SectionHeader } from "./SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard, faArrowUpRightFromSquare, faBuilding, faCircleChevronRight, faLaptop, faHouseLaptop, faLocationDot } from "@fortawesome/free-solid-svg-icons";

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

const formatDate = (dateString?: string) => {
    if (!dateString) return "Today";
    const date = new Date(dateString + "T12:00:00");
    return date.toLocaleDateString('en-CA', { month: 'short', year: 'numeric' });
};

const formatFullDate = (dateString?: string) => {
    if (!dateString) return "Today";
    const date = new Date(dateString + "T12:00:00");
    return date.toLocaleDateString('en-CA', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const Experiences = () => {
    const experiences = [
        {
            startDate: "2025-10-14",
            endDate: "2025-11-21",
            title: "Full-stack Web Developer",
            company: "Wazoom Studio",
            companyLocation: "Rivière-du-Loup, QC, CA",
            locationType: "Remote",
            selfEmployed: false,
            description: "This month was dedicated to building a WordPress website. My responsibilities covered the entire production pipeline, from developing back-end functionalities to integrating front-end interfaces. As a result, I was able to deliver a near-final version ready for staging.",
            tags: ["WordPress", "HTML5", "CSS", "JavaScript", "Git"],
        },
        {
            startDate: "2025-08-04",
            endDate: "2025-09-19",
            title: "Full-stack Web Developer",
            company: "Webilio",
            companyLocation: "Sainte-Thérèse, QC, CA",
            locationType: "Remote",
            selfEmployed: false,
            description: "During my two months at Webilio, I worked on an internal application developed with Laravel, GraphQL, and Vue.js. While I first had to learn to work within the context of this new company and project, I was quickly able to contribute to the creation and improvement of its features.\nI also had the opportunity to work on other internal projects for other companies, whether by performing QA or fixing critical bugs.",
            tags: ["Laravel", "Vue.js", "GraphQL", "Tailwind CSS", "Git"],
        },
        {
            startDate: "2025-03-17",
            endDate: "2025-04-18",
            title: "Back-end Web Developer",
            company: "Libéo",
            companyLocation: "Québec, QC, CA",
            locationType: "Remote",
            selfEmployed: true,
            description: "After my move to Vancouver, Libéo needed my expertise on an important project for the company and asked me to work on it for few weeks.\nThis was an opportunity for me to continue collaborating with my coworkers on a project that I'm proud of.",
            tags: ["TYPO3", "Méthodes agiles", "jQuery", "XML", "Sass", "Microsoft SQL Server", "PHP", "JavaScript", "CSS", "Applications PHP", "Git", "Gestion de projet agile", "Français"],
        },
        {
            startDate: "2019-11-25",
            endDate: "2025-02-28",
            title: "Back-end Web Developer",
            company: "Libéo",
            companyLocation: "Québec, QC, CA",
            locationType: "Hybrid",
            selfEmployed: false,
            description: "As part of the technical support team, I was quickly confronted with a diversity of customer's projects based on TYPO3 and WordPress CMS. Mastering these technologies rapidly, in multiple versions, was a significant challenge that I successfully achieved.\n\nThis period also gave me the opportunity to be part of the emergency contacts to be called in case of a critical error on a project outside of business hours. Although they remained rare, it was an opportunity for me to learn how to manage emergencies but also technologies that I did not know at the time.\n\nAs part of an internal reorganization, I then worked within several development teams, both on support projects and new creations. I was thus able to participate in the entire life cycle of many TYPO3 and WordPress sites, from design to their evolution. Many client projects were thus born, and all were subsequently deeply improved to meet the evolving needs of clients.\n\nI was also able to extend my skills by discovering new technologies such as Drupal, VueJS, and Docker, while consolidating my knowledge on more familiar environments like Laravel.\n\nThroughout my journey at Libéo, I was led to evolve my working methods. The evolution of agility and modern project management practices, as well as the constant evolution of development tools, have allowed me to develop a great capacity for adaptation and proactivity. This experience has not only enriched me technically but has also allowed me to cultivate a team spirit and rigor essential in a constantly changing environment.",
            tags: ["TYPO3", "WordPress", "Sonarqube", "API REST", "Drupal", "Laravel", "Test unitaire", "Docker", "Kubernetes", "Méthodes agiles", "GitLab", "AJAX", "jQuery", ".NET framework", "Tailwind CSS", "Vue.js", "XML", "Sass", "Microsoft SQL Server", "PHP", "JavaScript", "CSS", "Applications PHP", "Git", "Gestion de projet agile", "Français", "Anglais"],
        },
        {
            startDate: "2017-10-09",
            endDate: "2019-08-26",
            title: "Full-stack Web Developer",
            company: "Sider",
            companyLocation: "Canéjan, FR",
            locationType: "On-site",
            selfEmployed: false,
            description: "In my first professional experience outside of my studies, I worked as a full-stack web developer in an agile team composed of two developers, a project manager, and a UX/UI designer. We also collaborated closely with the marketing team.\n\nI primarily worked on the company's e-commerce website, developed with the Symfony framework, Sass, and jQuery. Many improvements were made to the site, including a new user interface, new search and filtering options, implementation of a new product management API, user behavior tracking, etc.\nI was involved in most of the improvements made during these two years, both frontend and backend. The variety of tasks allowed me to significantly improve my understanding of the framework and the different components of an e-commerce site, as well as a better understanding of user experience and conversion rates.\n\nIn parallel to this project, I was also responsible for creating and maintaining internal web tools. Starting from a need expressed by other teams, I developed detailed technical specifications, chose the most suitable technologies, and developed custom solutions to optimize work processes.\n\nFinally, I provided first-level technical support by handling requests and resolving issues encountered by users of the various applications we had developed within the team.\n\nThroughout these two years of experience, I had the opportunity to work in an agile mode by participating in two-week sprints and collaborating closely with my colleagues. This methodology allowed me to quickly adapt to changes in the project and deliver results frequently to meet new needs.",
            tags: ["Symfony", "jQuery", "Laravel", "MariaDB", "Sass", "Méthodes agiles", "Support technique", "AJAX", "GitLab", "MySQL", "HTML5", "Déploiement de projet", "Frameworks PHP", "Scrum", "SQL", "PHP", "JavaScript", "Feuilles de style en cascade (CSS)", "HTML", "Framework Symfony", "Applications PHP", "Git", "Ubuntu", "Linux", "Docker", "Français"],
        },
        {
            startDate: "2016-09-01",
            endDate: "2017-09-30",
            title: "Software Developer",
            company: "Aquitem",
            companyLocation: "Le Bouscat, FR",
            locationType: "On-site",
            selfEmployed: false,
            description: "During my year in the the DAWIN Professional Licence program, I worked on the development of a sales processing software for retail businesses.\n\nDevelopped with an older version of Windev (21), the softwaree they had implemented in several stores needed to be migrated to a more recent version. As a result, it was necessary to develop a solution to prevent users from losing their data during the version migration.\n\nFirst, I had to learn the Windev development environment and language. I then made some improvements and fixes to the existing system. After that, I built the tools for migration: a custom interface, data extraction and processing, progress monitoring, and handling of exceptions.\n\nI also have developed a ticket management and tracking interface using the Symfony Skeleton framework, jQuery, and Bootstrap.",
            tags: ["WINDEV", "WDSQL", "Symfony", "Microsoft SQL Server", "jQuery", "HTML5", "Framework Symfony", "Frameworks PHP", "SQL", "PHP", "JavaScript", "Feuilles de style en cascade (CSS)", "HTML", "Applications PHP", "Français"],
        }
    ];

    return (
        <section id="experiences">

            <SectionHeader
                title="Experience and Education"
                links={[
                    {
                        url: "https://www.linkedin.com/in/comeleleu/#experience",
                        label: "Experiences",
                        icon: faSquareLinkedin,
                    },
                    {
                        url: "https://www.linkedin.com/in/comeleleu/#education",
                        label: "Education",
                        icon: faSquareLinkedin,
                    },
                ]}
            />

            <div className="flex flex-col gap-4 mb-4">
                {experiences.map((experience) => (
                    <GlowingCard key={experience.title}>
                        <div className="relative flex flex-col gap-4 p-6">
                            <div className="flex flex-row justify-between items-center gap-6">
                                <div title={formatFullDate(experience.startDate) + " to " + formatFullDate(experience.endDate)} className="px-4 py-2 text-xs text-indigo-500 font-semibold bg-indigo-600/10 backdrop-blur-lg border border-indigo-400/10 rounded-full cursor-help">
                                    {formatDate(experience.startDate)} – {formatDate(experience.endDate)}
                                </div>
                                <div className="flex items-center gap-2">
                                    {experience.selfEmployed && (
                                        <div className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-500 font-semibold bg-neutral-600/10 backdrop-blur-lg border border-neutral-400/10 rounded-full">
                                            <FontAwesomeIcon icon={faAddressCard} className="text-xs" />
                                            Self-employed
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-500 font-semibold bg-neutral-600/10 backdrop-blur-lg border border-neutral-400/10 rounded-full">
                                        <FontAwesomeIcon icon={getLocationIcon(experience.locationType)} className="text-xs" />
                                        {experience.locationType}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="flex items-center gap-4 text-2xl font-semibold text-neutral-200">
                                    {experience.title}
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="inline-block text-xs text-neutral-400/40 group-hover:text-neutral-400/50 transition-all ease-in-out duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" />
                                </h3>
                                <div className="flex items-baseline gap-8 text-indigo-500">
                                    <p className="text-md font-semibold">{experience.company}</p>
                                    <p className="flex items-baseline gap-2 text-sm">
                                        <FontAwesomeIcon icon={faLocationDot} className="text-xs" />
                                        {experience.companyLocation}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-neutral-400">{experience.description}</p>
                            <ul className="flex flex-row flex-wrap gap-2">
                                {experience.tags.map((tag) => (
                                    <li key={tag} className="px-4 py-2 text-xs text-neutral-500 bg-neutral-500/10 backdrop-blur-lg border border-neutral-400/10 rounded-full">{tag}</li>
                                ))}
                            </ul>
                        </div>
                    </GlowingCard>
                ))}
            </div>

        </section>
    );
};