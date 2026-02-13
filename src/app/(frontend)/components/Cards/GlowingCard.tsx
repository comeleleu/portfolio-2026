"use client";

import { useEffect, ReactNode, ElementType } from "react";

type GlowingCardProps = {
    glowingBorderColor?: string;
    url?: string;
    children?: ReactNode;
};

export const GlowingCard = ({
    glowingBorderColor = "bg-linear-to-r from-blue-400 via-indigo-400 to-purple-300",
    url,
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

    const Tag = (url ? "a" : "div") as ElementType;

    return (
        <Tag
            href={url || undefined}
            target={url?.startsWith("http") ? "_blank" : undefined}
            rel={url?.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`glowingCard group relative block break-inside-avoid p-px bg-neutral-800 rounded-3xl shadow-lg overflow-hidden ${url ? "hover:bg-neutral-700 transition-colors ease-in-out duration-500 cursor-pointer" : "cursor-default"}`}
        >
            <div
                className={`glowingCardBorder absolute z-0 size-60 blur-3xl ${glowingBorderColor} rounded-full transition-opacity ease-in-out duration-500 opacity-0 pointer-events-none`}
            />

            <div className="relative z-10 w-full h-full bg-linear-to-br from-neutral-950/80 to-neutral-950/90 rounded-[inherit] overflow-hidden">
                {children ? (
                    children
                ) : null}
            </div>
        </Tag>
    );
};