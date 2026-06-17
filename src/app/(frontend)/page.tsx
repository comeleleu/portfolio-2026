import { unstable_cache } from "next/cache";
import { getPayload } from "@utils/getPayload";
import { t } from '@utils/getTranslations';
import { Navbar } from "@components/Navbar";
import { About } from "@components/Sections/About";
import { Experiences } from "@components/Sections/Experiences";
import { Studies } from "@components/Sections/Studies";
import { Projects } from "@components/Sections/Projects";
import { Footer } from "@components/Footer";

const getCachedSections = unstable_cache(
    async () => {
        const payload = await getPayload();
        return payload.findGlobal({
            slug: 'sections',
            depth: 1,
        });
    },
    ['global-sections'],
    {
        tags: ['sections', 'links', 'medias']
    }
);

export default async function Home() {

    let sectionsData: any = null;

    try {
        sectionsData = await getCachedSections();
    } catch (err) {
        console.error('Error fetching section data', err);
    }

    const navSections = [
        {
            id: 'about',
            label: sectionsData?.about?.shortTitle || await t('about.title'),
            icon: 'faCircleUser'
        },
        {
            id: 'experiences',
            label: sectionsData?.experiences?.shortTitle || await t('experiences.title'),
            icon: 'faLaptopCode'
        },
        {
            id: 'studies',
            label: sectionsData?.studies?.shortTitle || await t('studies.title'),
            icon: 'faGraduationCap'
        },
        {
            id: 'projects',
            label: sectionsData?.projects?.shortTitle || await t('projects.title'),
            icon: 'faFolderOpen'
        },
    ];

    return (
        <div className="md:grid md:grid-cols-[auto_1fr] min-h-screen max-w-7xl mx-auto">
            <Navbar sectionParameters={sectionsData} navSections={navSections} />

            <div className="flex flex-col gap-12 md:gap-16 px-4 sm:px-6 md:px-4 lg:pl-6">
                <main
                    className="flex flex-col gap-16"
                    role="main"
                >
                    <About sectionParameters={sectionsData?.about} />

                    
                    <div className="flex flex-col">
                        <Experiences sectionParameters={sectionsData?.experiences} />

                        <Studies sectionParameters={sectionsData?.studies} />
                    </div>
                    

                    <Projects sectionParameters={sectionsData?.projects} />
                </main>

                <Footer sectionParameters={sectionsData?.navbar} />
            </div>
        </div>
    );
}
