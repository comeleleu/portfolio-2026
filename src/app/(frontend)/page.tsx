import { unstable_cache } from "next/cache";
import { getLocale } from 'next-intl/server';
import { getPayload } from "@utils/getPayload";
import { Navbar } from "@components/Navbar";
import { About } from "@components/Sections/About";
import { Experiences } from "@components/Sections/Experiences";
import { Studies } from "@components/Sections/Studies";
import { Projects } from "@components/Sections/Projects";
import { Footer } from "@components/Footer";

const getCachedSections = (locale: string) => unstable_cache(
    async () => {
        const payload = await getPayload();
        return payload.findGlobal({
            slug: 'sections',
            locale: locale as any,
            depth: 1,
        });
    },
    [`global-sections-${locale}`],
    { tags: ['sections', 'links', 'medias'] }
);

export default async function Home() {
    let sectionsData: any = null;

    try {
        const locale = await getLocale();
        sectionsData = await getCachedSections(locale)();
    } catch (err) {
        console.error('Error fetching section data', err);
    }

    return (
        <div className="md:grid md:grid-cols-[auto_1fr] min-h-screen max-w-7xl mx-auto">
            <Navbar sectionParameters={sectionsData} />

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
