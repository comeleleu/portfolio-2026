import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
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
        <div className="grid sm:grid-cols-[auto_1fr] min-h-screen max-w-7xl mx-auto">
            <Navbar sectionParameters={sectionsData?.navbar}/>

            <div className="flex flex-col gap-32 px-8 py-6 sm:py-10">
                <About sectionParameters={sectionsData?.about} />

                
                <div className="flex flex-col gap-12">
                    <Experiences sectionParameters={sectionsData?.experiences} />

                    <div className="w-1/2 flex items-center text-sm font-semibold text-neutral-600/80 before:flex-1 before:border-t before:border-dashed before:border-neutral-800/80 before:me-8">
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faGraduationCap} className="text-lg" />
                            Studies
                        </div>
                    </div>

                    <Studies />
                </div>
                

                <Projects sectionParameters={sectionsData?.projects} />

                <Footer />
            </div>
        </div>
    );
}
