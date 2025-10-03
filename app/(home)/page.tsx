"use client"
import { ArrowLongRightIcon, SlashIcon } from "@heroicons/react/24/outline";
import { DocumentCodeIcon } from "hugeicons-react";
import { useRouter } from "next/navigation";

const links: { label: string, href: string }[] = [
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "contact", href: "/contact" },
]
export default function Home(){
  const router = useRouter()
  return (
    <main className="min-h-[70vh] flex items-center w-11/12">
      <section className="lg:w-10/12 mx-auto select-none space-y-3">
        {/* Brand row */}
        <h1 className="flex items-center gap-4 text-3xl lg:text-7xl font-mono tracking-wide text-gray-200 p-0">
          <span className="opacity-90">solenoid</span>
          <span className="relative group"onClick={() => router.push("/about/resume")}>
            <DocumentCodeIcon className="w-8 h-8 cursor-pointer text-gray-400 hover:text-gray-100 left-1/2" />
            <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-gray-800 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
              View my resume
            </span>
          </span>
         
        </h1>

        {/* Tagline */}
        <p className="mt-6  lg:text-xl text-gray-400 max-w-3xl leading-relaxed">
          Hi! I&apos;m Solomon, a student passionate about creating things that are both useful and visually appealing.
        </p>

        {/* Links row */}
        <nav className="flex flex-col md:flex-row items-start gap-3 lg:gap-8 text-white lg:text-2xl">
                {links.map((link) => (
                    <span key={link.href} className={`cursor-pointer group relative flex items-center gap-0 `} onClick={() => { router.push(link.href) }}>
                        <SlashIcon className="w-6 h-8 transition-transform duration-300 opacity-100 group-hover:opacity-0 group-hover:rotate-70 inline-block absolute left-0" />
                        <ArrowLongRightIcon className="w-4 h-8 transition-transform duration-300 -rotate-70 opacity-0 group-hover:inline-block group-hover:opacity-100 group-hover:rotate-0" />
                        <span className="font-thin">{link.label}</span>
                    </span>
                ))}
            </nav>
      </section>
    </main>
  )
}


