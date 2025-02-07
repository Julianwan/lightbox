'use client'

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageBody = {
  hero: string;
  thumbnail: string;
};

export default function Lightbox() {
  const Images: ImageBody[] = [
    {
      hero: "https://placehold.co/1280x720.png?text=Image+1",
      thumbnail: "https://placehold.co/640x360.png?text=Thumb+1",
    },
    {
      hero: "https://placehold.co/1280x720.png?text=Image+2",
      thumbnail: "https://placehold.co/640x360.png?text=Thumb+2",
    },
    {
      hero: "https://placehold.co/1280x720.png?text=Image+3",
      thumbnail: "https://placehold.co/640x360.png?text=Thumb+3",
    },
    {
      hero: "https://placehold.co/1280x720.png?text=Image+4",
      thumbnail: "https://placehold.co/640x360.png?text=Thumb+4",
    },
    {
      hero: "https://placehold.co/1280x720.png?text=Image+5",
      thumbnail: "https://placehold.co/640x360.png?text=Thumb+5",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Main Image Container */}
      <div className="relative w-full max-w-5xl mx-auto aspect-video bg-gray-100 rounded-xl shadow-lg overflow-hidden">
        <Image
          src={Images[currentIndex].hero}
          alt="Hero image"
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
        
        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {Images.map((image, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`
                relative aspect-video rounded-lg overflow-hidden
                ${currentIndex === i 
                  ? 'ring-2 ring-blue-500 scale-95 transform'
                  : 'hover:ring-2 hover:ring-blue-400 hover:scale-95'
                }
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            >
              <Image
                src={image.thumbnail}
                alt={`Thumbnail ${i + 1}`}
                fill
                className={`
                  object-cover
                  ${currentIndex === i ? 'brightness-90' : 'hover:brightness-75'}
                  transition-all duration-200
                `}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}