import React from "react";

interface TagProps {
    tagName?: string;
}

export const Tag: React.FC<TagProps> = ({ tagName } : TagProps) => {
    return (
        <span className="text-white text-xs bg-indigo-950 py-1 px-3 rounded-full min-w-max">{tagName}</span>
    )
}