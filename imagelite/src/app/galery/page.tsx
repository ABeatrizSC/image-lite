'use client'

import { ImageCard } from "@/components/ImageCard";
import { Template } from "@/components/Template";
import { Image } from "@/resources/image/image.resource";
import { useImageService } from "@/resources/image/image.service";
import { useState } from "react";

export default function GaleryPage(){
    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [extension, setExtension] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function searchImages(){
        setLoading(true)
        const result = await useService.search(query, extension);
        setImages(result);
        setLoading(false);
    }

    function renderImageCard(image: Image) {
        return(
            <ImageCard
                key={image.url} 
                name={image.name} 
                src={image.url}
                size={image.size}
                uploadDate={image.uploadDate}
                extension={image.extension}
            />
        )
    }

    return (
        <Template loading={loading}>
            <section className="flex flex-col items-center justify-center my-5">
                <div className="flex space-x-4">
                    <input 
                        type="text" 
                        className="border px-3 py-2 rounded-lg text-gray-900"
                        onChange={event => setQuery(event.target.value)}
                    />
                    <select 
                        className="border px-4 py-2 rounded-lg text-gray-900"
                        onChange={event => setExtension(event.target.value)}
                    >
                        <option value="">ALL</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                        <option value="GIF">GIF</option>
                    </select>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-300" onClick={searchImages}>Search</button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-yellow-300" onClick={searchImages}>Add New</button>
                </div>
            </section>
            <section className="grid grid-cols-3 gap-8 pt-4">
                {images.map(renderImageCard)}
            </section>
        </Template>
    )
}