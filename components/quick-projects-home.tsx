import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import ProjectCard from "./project-card";
import image1 from "@/assets/image-a.jpg";
import image2 from "@/assets/image-b.jpg";

export default function QuickProjectsHome() {
    return (
            <div className="mt-10 py-20">
                <span className="flex items-center justify-between gap-2"><h1 className="text-3xl lg:text-4xl">featured projects</h1> <span className="text-sm text-gray-500 hover:text-gray-300 cursor-pointer flex items-center gap-2 group duration-300">view all <ArrowLongRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-all duration-300" /></span></span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 ">
                <ProjectCard title="Project 1" description="Description 1" image={image1.src} link="link 1" date="date 1" />
                <ProjectCard title="Project 2" description="Description 2" image={image2.src} link="link 2" date="date 2" />
            </div>
        </div>
    )
}