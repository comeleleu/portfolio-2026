import { getPayload } from "@utils/getPayload";
import { Navbar } from "@components/Navbar";
import { About } from "@components/Sections/About";
import { Experiences } from "@components/Sections/Experiences";
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
        <div className="grid sm:grid-cols-[auto_1fr] min-h-screen max-w-7xl mx-auto">
            <Navbar sectionParameters={sectionsData?.navbar}/>

            <div className="flex flex-col gap-32 px-8 py-6 sm:py-10">
                <About sectionParameters={sectionsData?.about} />

                <Experiences sectionParameters={sectionsData?.experiences} />

                <Projects sectionParameters={sectionsData?.projects} />

                <Footer />
            </div>
        </div>
    );
}
