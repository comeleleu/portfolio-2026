"use client";

import { useState } from "react";

type TagsProps = {
    tags: string | any[];
    maxTags?: number;
    color?: string;
};

export const Tags = ({
    tags,
    maxTags = 8,
    color = "text-neutral-500 bg-neutral-600/10 border-neutral-400/10 hover:bg-neutral-500/20",
}: TagsProps) => {
    const [showAll, setShowAll] = useState(false);
    const displayedTags = showAll ? tags : tags.slice(0, maxTags);
    const hasMore = tags.length > maxTags;

    return (
        <ul className="flex flex-row flex-wrap gap-2">
            {displayedTags.map((tag) => (
                <li key={tag.id} className="px-4 py-2 text-xs text-neutral-500 bg-neutral-500/10 backdrop-blur-lg border border-neutral-400/10 rounded-full">{tag.name}</li>
            ))}
            {hasMore && (
                <li
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowAll(!showAll);
                    }}
                    className={`flex items-center gap-1 px-4 py-2 text-xs font-extrabold backdrop-blur-lg border ${color} rounded-full cursor-pointer transition-colors ease-in-out duration-500`}
                >
                    {showAll ? "—" : `+ ${tags.length - maxTags}`}
                </li>
            )}
        </ul>
    );
};