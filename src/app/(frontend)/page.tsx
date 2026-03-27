import { getPayload } from "@utils/getPayload";
import { Navbar } from "@components/Navbar";
import { About } from "@components/Sections/About";
import { Experiences } from "@components/Sections/Experiences";
import { Studies } from "@components/Sections/Studies";
import { Projects } from "@components/Sections/Projects";
import { Footer } from "@components/Footer";

export default async function Home() {

    let sectionsData: any = null;

    try {
        const payload = await getPayload();
        sectionsData = await payload.findGlobal({
            slug: 'sections',
            depth: 1,
        });
    } catch (err) {
        console.error('Error fetching section data', err);
    }

    return (
        <div className="sm:grid sm:grid-cols-[auto_1fr] min-h-screen max-w-7xl mx-auto">
            <Navbar sectionParameters={sectionsData?.navbar} />

            <div className="flex flex-col gap-16 px-8">
                <About sectionParameters={sectionsData?.about} />

                
                <div className="flex flex-col">
                    <Experiences sectionParameters={sectionsData?.experiences} />

                    <Studies />
                </div>
                

                <Projects sectionParameters={sectionsData?.projects} />

                <Footer sectionParameters={sectionsData?.navbar} />
            </div>
        </div>
    );
}
