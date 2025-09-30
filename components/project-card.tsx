import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProjectCard({title, description, image, link, date}: {title: string, description: string, image: string, link: string, date: string}) {
    const router = useRouter();
    return (
        <div className="flex flex-col items-start gap-2 cursor-pointer group duration-300" onClick={()=>{router.push(link)}}>
            <span className="mb-2 w-full aspect-video outline-0 group-hover:outline-2 group-hover:outline-gray-450 group-hover:transition-all group-hover:duration-300 grid place-items-center overflow-hidden">
                <Image src={image} alt={title} className="w-full h-full object-cover" />
            </span>
            <div className="flex items-start justify-between w-full">
                <span>
                    <h2 className="text-xl flex items-center gap-2 mb-1">
                        {title} 
                        <ArrowLongRightIcon className="w-6 h-6 inline-block opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:transition-all group-hover:duration-300"/>
                    </h2>
                    <p className="text-md">{description}</p>
                </span>
                <p className="text-sm">{date}</p>
            </div>
        </div>
    )
}