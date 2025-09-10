"use client"
import { usePathname, useRouter } from "next/navigation";
import { ArrowLongRightIcon, Bars3Icon, SlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const links: { label: string, href: string }[] = [
    { label: "about", href: "/about" },
    { label: "projects", href: "/projects" },
    { label: "contact", href: "/contact" },
]
export default function Header() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    const pathname = usePathname();
    const router = useRouter();
    const isActive = (path: string) => pathname === path;
    return <header className="flex items-center justify-between bg-transparent backdrop-blur-xl py-4 sticky top-0 left-0 right-0 z-10 font-mono">
        <section className="flex items-center justify-between w-11/12 mx-auto backdrop-blur-xl">
            <span className="text-2xl flex items-center gap-2">
                <span onClick={() => { router.push("/") }} className="cursor-pointer">~</span>{pathname === "/" ? "" : pathname} /<span className="w-3 h-6 inline-block bg-white animate-pulse"></span>
            </span>
            <nav className="items-center gap-8 text-white text-2xl hidden lg:flex">
                {links.map((link) => (
                    <span key={link.href} className={`cursor-pointer group relative flex items-center gap-0 ${isActive(link.href) ? "font-bold" : "font-light"}`} onClick={() => { router.push(link.href) }}>
                        <SlashIcon className="w-6 h-8 transition-transform duration-300 opacity-100 group-hover:opacity-0 group-hover:rotate-70 inline-block absolute left-0" />
                        <ArrowLongRightIcon className="w-4 h-8 transition-transform duration-300 -rotate-70 opacity-0 group-hover:inline-block group-hover:opacity-100 group-hover:rotate-0" />
                        <span className="">{link.label}</span>
                    </span>
                ))}
            </nav>
            <button
                    onClick={() => setIsMobileNavOpen(prev => !prev)}
                    className="lg:hidden block cursor-pointer relative focus:outline-none"
                    aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
                >
                    <span className="relative w-10 h-10 flex items-center justify-center">
                        {/* Animated morph between Bars3Icon and XMarkIcon */}
                        <Bars3Icon
                            className={`w-10 h-10 absolute transition-all duration-300 ${isMobileNavOpen ? "opacity-0 scale-90 rotate-45" : "opacity-100 scale-100 rotate-0"}`}
                        />
                        <XMarkIcon
                            className={`w-10 h-10 absolute transition-all duration-300 ${isMobileNavOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 -rotate-45"}`}
                        />
                    </span>
                </button>
            {isMobileNavOpen && (
               
                   
                    <nav className="animate-fade-in absolute w-full h-screen inset-0 bg-black/90 top-18 scroll-none z-10 flex flex-col items-start lg:hidden inline-block">
                    <style>{`
                        body {
                            overflow: hidden !important;
                        }
                    `}</style>
                        {links.map((link) => (
                            <span
                                key={link.href}
                                className={`h-[10vh] px-10 md:px-14 w-full cursor-pointer group relative flex items-center gap-0 hover:bg-gray-50/20 hover:text-white ${isActive(link.href) ? "text-white" : "text-gray-400"}`}
                                onClick={() => { router.push(link.href) }}
                            >
                                <SlashIcon className="w-6 h-8 transition-transform duration-300 opacity-100 group-hover:opacity-0 group-hover:rotate-70 inline-block absolute left-10 md:left-14" />
                                <ArrowLongRightIcon className="w-6 h-8 transition-transform duration-300 -rotate-70 opacity-0 group-hover:inline-block group-hover:opacity-100 group-hover:rotate-0" />
                                <span className="">{link.label}</span>
                            </span>
                        ))}
                    </nav>
                
            )}
        </section>
    </header>
}