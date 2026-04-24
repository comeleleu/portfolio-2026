"use client";

import { useEffect, ReactNode } from "react";
import { Link, CustomLink } from "@components/Common/Link";

type GlowingCardProps = {
    glowingBorderColor?: string;
    link?: CustomLink | null;
    children?: ReactNode;
};

export const GlowingCard = ({
    glowingBorderColor = "bg-zinc-300",
    link,
    children,
}: GlowingCardProps) => {
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
        <Link
            link={link}
            className={`glowingCard group relative block break-inside-avoid p-px bg-zinc-700/70 rounded-3xl shadow-lg overflow-hidden ${link?.url ? "hover:bg-zinc-600/95 transition-colors ease-in-out duration-500 cursor-pointer" : "cursor-default"}`}
        >
            <div
                className={`glowingCardBorder absolute left-(--mouse-x) top-(--mouse-y) -translate-x-1/2 -translate-y-1/2 z-0 size-80 ${glowingBorderColor} blur-3xl rounded-full transition-opacity ease-in-out duration-500 opacity-0 pointer-events-none`}
            />

            <div className="relative z-10 w-full h-full bg-linear-to-br/oklch from-zinc-950/80 to-zinc-950/90 rounded-[inherit] overflow-hidden">
                {children ? (
                    children
                ) : null}
            </div>
        </Link>
    );
};