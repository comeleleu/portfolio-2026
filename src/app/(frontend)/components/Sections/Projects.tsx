import { unstable_cache } from "next/cache";
import { getTranslations, getLocale } from 'next-intl/server';
import { formatDate } from "@utils/formatDate";
import { getPayload } from "@utils/getPayload";
import { getTextHeight } from "@utils/parseText";
import { GlowingCard } from "@components/Cards/GlowingCard";
import { Badge } from "@components/Cards/Elements/Badge";
import { Tags } from "@components/Cards/Elements/Tags";
import { Title } from "@components/Cards/Elements/Title";
import { Description } from "@components/Common/Description";
import { SectionHeader } from "@components/Sections/Elements/SectionHeader";
import { NoResultMessage } from "@components/Sections/Elements/NoResultMessage";

const getCachedProjects = (locale: string) => unstable_cache(
    async () => {
        const payload = await getPayload();
        const result = await payload.find({
            collection: 'projects',
            locale: locale as any,
            limit: 100,
            depth: 1,
            overrideAccess: true,
            where: {
                published: { equals: true }
            },
            sort: ['-startDate', '-endDate'],
        });
        return result?.docs || [];
    },
    [`projects-list-${locale}`],
    {
        tags: ['projects', 'links', 'tags']
    }
);

export const Projects = async ({ sectionParameters }: { sectionParameters: any }) => {
    const t = await getTranslations();
    const locale = await getLocale();
    let projects: any[] = [];

    try {
        projects = await getCachedProjects(locale)();
    } catch (err) {
        console.error(t('projects.fetchingFailed'), err);
    }

    const projectCards = await Promise.all(projects.map(async (project: any) => {
        let dateShort;
        let dateLong;

        if (project.startDate == project.endDate || (!project.endDate && !project.currentProject)) {
            dateShort = formatDate(project.startDate, 'shortNoDay', locale);
            dateLong = formatDate(project.startDate, 'longNoDay', locale);
        } else {
            const today = (t('general.dateToday')) as string;

            dateShort = t('general.dateShort', {
                startDate: formatDate(project.startDate, 'shortNoDay', locale),
                endDate: project.currentProject ? today : formatDate(project.endDate, 'shortNoDay', locale)
            });
            dateLong = t('general.dateLongMonth', {
                startDate: formatDate(project.startDate, 'longNoDay', locale),
                endDate: project.currentProject ? today.toLowerCase() : formatDate(project.endDate, 'longNoDay', locale)
            });
        }

        return (
            <GlowingCard
                key={project.id ?? project._id ?? project.title}
                glowingBorderColor="bg-linear-to-r/oklch from-emerald-200 via-cyan-400 to-blue-400"
                link={project.link}
            >
                <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:px-6">
                    <div className="flex">
                        <Badge
                            label={dateShort}
                            labelHover={dateLong}
                            textColor="text-cyan-400"
                            backgroundColor="bg-cyan-600/10"
                            borderColor="border-cyan-300/10"
                        />
                    </div>
                    <Title
                        title={project.title}
                        subtitle={t(`projects.context.${project.context}`)}
                        isLink={!!project.link?.url}
                        subtitleColor="text-cyan-400"
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
    }));

    const distributeProjects = (numCols: number) => {
        if (numCols === 1) return [projectCards];
        
        const colHeights = new Array(numCols).fill(0);
        const cols: any[][] = Array.from({ length: numCols }, () => []);
        
        projects.forEach((project: any, i: number) => {
            // Estimation of the height: base height + height of the title + height of the description
            const titleLength = getTextHeight(project.title, {
                charactersPerLine: 30,
                lineHeight: 28
            });
            const descHeight = getTextHeight(project.description, {
                charactersPerLine: 45
            });
            
            const estimatedHeight = 142 + titleLength + descHeight;
            
            let minCol = 0;
            for (let j = 1; j < numCols; j++) {
                if (colHeights[j] < colHeights[minCol]) {
                    minCol = j;
                }
            }
            
            cols[minCol].push(projectCards[i]);
            colHeights[minCol] += estimatedHeight;
        });
        
        return cols;
    };

    const desktopCols = distributeProjects(3);
    const tabletCols = distributeProjects(2);

    return (
        <section id="projects" className="scroll-mt-16 md:scroll-mt-0">
            <SectionHeader
                title={sectionParameters?.title || t('projects.title')}
                sectionIcon="faFolderOpen"
                underlineFromColor="[--underline-from:var(--color-blue-500)]"
                underlineToColor="[--underline-to:var(--color-cyan-500)]"
                underlineFromStop="[--underline-from-stop:5%]"
                underlineToStop="[--underline-to-stop:50%]"
                links={sectionParameters?.links}
            />
            {projects.length > 0 ? (
                <>
                    {/* Desktop (3 colonnes) */}
                    <div className="hidden lg:grid grid-cols-3 gap-4">
                        {desktopCols.map((col, colIndex) => (
                            <div key={colIndex} className="flex flex-col gap-4">
                                {col}
                            </div>
                        ))}
                    </div>

                    {/* Tablette (2 colonnes) */}
                    <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
                        {tabletCols.map((col, colIndex) => (
                            <div key={colIndex} className="flex flex-col gap-4">
                                {col}
                            </div>
                        ))}
                    </div>

                    {/* Mobile (1 colonne) */}
                    <div className="grid md:hidden grid-cols-1 gap-4">
                        <div className="flex flex-col gap-4">
                            {projectCards}
                        </div>
                    </div>
                </>
            ) : (
                <NoResultMessage message={t('projects.noResult')} />
            )}
        </section>
    );
}