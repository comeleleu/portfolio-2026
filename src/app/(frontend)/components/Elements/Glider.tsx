"use client";

import { useState, useLayoutEffect, useRef } from "react";

export interface GliderOption {
    id: string;
    label: string;
    ariaLabel?: string;
    action: () => void;
}

interface GliderProps {
    options: GliderOption[];
    activeId: string;
    isVisible?: boolean;
    isActive?: boolean;
}

export const Glider = ({ options, activeId, isVisible = true, isActive = true }: GliderProps) => {
    const [gliderStyle, setGliderStyle] = useState({ width: 0, left: 0, height: 0, top: 0 });
    const [isGliderInitialized, setIsGliderInitialized] = useState(false);
    const gliderContainerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    // Initialize glider position, then add transition properties
    useLayoutEffect(() => {
        const activeRef = buttonRefs.current[activeId];
        
        if (activeRef && gliderContainerRef.current && isVisible) {
            const { offsetLeft, offsetWidth, offsetHeight } = activeRef;
            const gliderContainerStyle = getComputedStyle(gliderContainerRef.current);
            const gliderContainerPaddingLeft = parseFloat(gliderContainerStyle.paddingLeft);

            setGliderStyle({ width: offsetWidth, left: offsetLeft - gliderContainerPaddingLeft, height: offsetHeight, top: 0 });
            
            const timeoutId = setTimeout(() => {
                setIsGliderInitialized(true);
            }, 10);
            return () => clearTimeout(timeoutId);
        }
    }, [activeId, isVisible, options]);

    return (
        <div ref={gliderContainerRef} className="relative flex gap-1 p-1 bg-zinc-500/15 backdrop-blur-sm border border-zinc-300/15 rounded-full">
            <span
                className={`
                    absolute bg-indigo-700/20 border border-indigo-300/20 rounded-full
                    ${isGliderInitialized ? 'transition-all ease-in-out duration-300' : ''}
                `}
                style={{ width: gliderStyle.width, height: gliderStyle.height, transform: `translateX(${gliderStyle.left}px)` }}>
            </span>
            {options.map((option) => {
                const isSelected = activeId === option.id;
                
                return (
                    <button
                        key={option.id}
                        type="button"
                        className={`
                            relative z-10 px-3 py-1.5 text-sm font-semibold rounded-full transition-all ease-in-out duration-300
                            ${isSelected ? 'text-indigo-400'
                            : 'text-zinc-300 hover:text-zinc-200 cursor-pointer'}
                        `}
                        onClick={option.action}
                        disabled={isSelected}
                        aria-label={option.ariaLabel}
                        tabIndex={isActive ? 0 : -1}
                        aria-hidden={!isActive}
                        ref={(el) => {
                            buttonRefs.current[option.id] = el;
                        }}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
};
