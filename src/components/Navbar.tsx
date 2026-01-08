import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faSquareLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
    return (
        <div className="sticky top-0 z-50 flex flex-row sm:flex-col items-center justify-between gap-6 sm:h-screen px-8 sm:px-auto py-6 sm:py-10 bg-linear-to-b from-neutral-950/95 via-neutral-950/50 to-transparent via-60% to-99% sm:bg-none overflow-hidden">

            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                backdropFilter: "blur(50px)",
                WebkitBackdropFilter: "blur(50px)",
                WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%)",
                maskImage: "linear-gradient(to top, transparent 00%, black 70%)",
                }}
            />

            <div className="relative z-10 flex flex-row sm:flex-col items-center gap-6">
                <div className="relative z-10 flex flex-row sm:flex-col items-center gap-6">
                    <a href="https://www.linkedin.com/in/comeleleu/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faSquareLinkedin} className="w-8 h-8" />
                    </a>
                    <a href="https://github.com/comeleleu" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="w-8 h-8" />
                    </a>
                </div>
                <div className="h-px sm:h-20 w-20 sm:w-px bg-neutral-600"></div>
            </div>
            <div className="relative z-10">
                <FontAwesomeIcon icon={faChevronUp} className="w-8 h-8" />
            </div>
        </div>
    );
};