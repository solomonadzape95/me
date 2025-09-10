import Image from "next/image";

export default function ProjectCarousel({ images, altBase }: { images: string[]; altBase: string }) {
  if (!images || images.length === 0) return null;
  return (
    <div className="overflow-x-auto snap-x snap-mandatory flex gap-6 pb-3 scrollbar-none w-screen relative left-1/2 -translate-x-1/2 px-4">
      {images.map((img, i) => (
        <div key={i} className="relative snap-start shrink-0 w-[95%] md:w-[90%] lg:w-[80%] xl:w-[72%] 2xl:w-[64%] aspect-[16/9] overflow-hidden border border-gray-50/20">
          <Image src={img} alt={`${altBase}-${i}`} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}


