'use client'

import { Tag } from "./Tag";

interface ImageCardProps {
    name?: string;
    size?: number;
    uploadDate?: string;
    src?: string;
    extension?: string;
    tags?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ 
    name, uploadDate, src, size, extension, tags
}: ImageCardProps) => {

    const tagsArray = tags?.split(",")

    function download(){
        window.open(src, '_blank')
    }

    return (
        <div className="card relative bg-white rounded-md shadow-md transition-tranform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
            <img src={src} onClick={download} className="cursor-pointer h-56 w-full object-cover rounded-t-md" alt="" />
            <div className="card-body p-4">
                <h5 className="text-xl font-semibold mb-2 text-gray-600">{name}</h5>
                <p className="text-gray-600">{extension}</p>
                <p className="text-gray-600">{formatBytes(size)}</p>
                <p className="text-gray-600">{uploadDate}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                    { tagsArray?.map((tag, index) => <Tag key={index} tagName={tag} />) }
                </div>
            </div>
        </div>
    )
}

function formatBytes(bytes: number = 0, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}