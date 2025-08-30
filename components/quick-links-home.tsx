"use client";
import { ArrowLongRightIcon,   } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import {GithubIcon, Linkedin01Icon, DocumentCodeIcon} from "hugeicons-react";
const links :{label: string, href: string, icon: React.ReactNode}[] = [
    {label: "Github", href: "https://github.com/solomonadzape95", icon: <GithubIcon className="w-4 h-4"/>},
    {label: "LinkedIn", href: "https://www.linkedin.com/in/solomon-adzape/", icon: <Linkedin01Icon className="w-4 h-4"/>},
    {label: "Resume", href: "/resume.pdf", icon: <DocumentCodeIcon className="w-4 h-4"/>}
]
export default function QuickLinksHome() {
    const router = useRouter();
    return (    
        <div className="flex items-center gap-6 flex-wrap text-sm w-full lg:w-auto">
            {links.map((link) => (
                <div  key={link.href} className="flex items-center gap-4">
                    <span className="group relative flex items-center gap-2 cursor-pointer">
                <span className="transition-transform duration-300 opacity-100 group-hover:opacity-0 group-hover:rotate-70 inline-block absolute left-0" />
                {link.icon}
                <span className="">{link.label}</span>
                </span>
                <span>|</span></div>
            ))}
            <span className="flex items-center gap-1 lg:gap-2 cursor-pointer " onClick={()=>{router.push("/about")}}>More about me... <ArrowLongRightIcon className="w-4 lg:w-6 h-4 inline-block" /></span>
        </div>
    )
}