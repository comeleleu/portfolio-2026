import { useEffect, ReactNode } from "react";

type GlowingCardProps = {
    children?: ReactNode;
    glowingBorderColor?: string;
    overflowHidden?: boolean;
};

export const GlowingCard = ({ children, glowingBorderColor, overflowHidden }: GlowingCardProps) => {

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const cards = document.getElementsByClassName("glowingCard") as HTMLCollectionOf<HTMLElement>;
            for (const card of cards) {
                const cardBorder = card.querySelector(".glowingCardBorder") as HTMLElement | null;
                if (!cardBorder) continue;

                const rect = card.getBoundingClientRect();

                const nearestX = Math.max(rect.left, Math.min(e.clientX, rect.right));
                const nearestY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
                const dx = e.clientX - nearestX;
                const dy = e.clientY - nearestY;
                const dist = Math.hypot(dx, dy);

                if (dist <= 300) {
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    cardBorder.style.setProperty("--mouse-x", `${x}px`);
                    cardBorder.style.setProperty("--mouse-y", `${y}px`);
                    cardBorder.style.setProperty("opacity", "1");
                } else {
                    cardBorder.style.setProperty("opacity", "0");
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            className="glowingCard group relative block break-inside-avoid p-px bg-neutral-800 hover:bg-neutral-700 rounded-3xl shadow-lg transition-colors ease-in-out duration-800 overflow-hidden cursor-pointer"
        >
            <div
                className={`glowingCardBorder absolute z-0 size-60 blur-3xl ${glowingBorderColor ?? "bg-linear-to-r from-blue-400 via-indigo-400 to-purple-300"} rounded-full transition-opacity ease-in-out duration-500 opacity-0 pointer-events-none`}
            />

            <div className={`relative z-10 w-full h-full bg-linear-to-br from-neutral-950/80 to-neutral-950/90 rounded-[inherit] ${overflowHidden ? "overflow-hidden" : ""}`}>
                {children ? (
                    children
                ) :  null}
            </div>
        </div>
    );
};