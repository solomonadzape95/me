"use client"
// import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function ProjectCarousel({ images, altBase }: { images: string[]; altBase: string }) {
  // const [openImage, setOpenImage] = useState<string|null>(null)
  if (!images || images.length === 0) return null;
  return (
    <>
    <div className="overflow-x-auto snap-x snap-mandatory flex gap-6 pb-3 scrollbar-none w-screen relative left-1/2 -translate-x-1/2 px-4">
      {images.map((img, i) => (
        <div key={i} className="relative snap-start shrink-0 w-[95%] md:w-[90%] lg:w-[80%] xl:w-[72%] 2xl:w-[64%] aspect-[16/9] overflow-hidden border border-gray-50/20">
          <Image src={img} alt={`${altBase}-${i}`} fill className="object-cover"/>
        </div>
      ))}
      
    </div>
    {/* {openImage && (
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <button
          className="absolute top-6 right-8 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition"
          onClick={() => setOpenImage(null)}
          aria-label="Close image viewer"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>
        <div className="relative flex flex-col items-center w-full h-full">
          <Image
            src={openImage}
            alt={openImage}
            fill
            className="object-contain w-full h-full max-w-5xl max-h-[90vh] m-auto"
            style={{ background: "#111" }}
            onClick={() => setOpenImage(null)}
            priority
          />
        </div>
      </section>
    )} */}
    </>
  );
}


