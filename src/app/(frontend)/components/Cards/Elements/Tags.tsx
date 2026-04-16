"use client";

import { useState } from "react";

type TagsProps = {
    tags: { id: string; label: string }[];
    maxTags?: number;
    textColor?: string;
    backgroundColor?: string;
    borderColor?: string;
};

export const Tags = ({
    tags,
    maxTags = 8,
    textColor = "text-zinc-300 hover:text-zinc-200",
    backgroundColor = "bg-zinc-400/15 hover:bg-zinc-300/20",
    borderColor = "border-zinc-200/15 hover:border-zinc-100/20",
}: TagsProps) => {
    const [showAll, setShowAll] = useState(false);

    if (!tags || tags.length === 0) return null;

    const displayedTags = showAll ? tags : tags.slice(0, maxTags);
    const hasMore = tags.length > maxTags;

    return (
        <ul className="flex flex-row flex-wrap gap-2">
            {displayedTags.map((tag) => (
                <li key={tag.id} className="px-4 py-2 text-xs text-zinc-400 bg-zinc-500/10 backdrop-blur-sm border border-zinc-300/10 rounded-full">{tag.label}</li>
            ))}
            {hasMore && (
                <li
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowAll(!showAll);
                    }}
                    className={`px-4 py-2 text-xs font-extrabold ${textColor} ${backgroundColor} backdrop-blur-sm border rounded-full ${borderColor} cursor-pointer transition-colors ease-in-out duration-500`}
                >
                    {showAll ? `−` : `+ ${tags.length - maxTags}`}
                </li>
            )}
        </ul>
    );
};