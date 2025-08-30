"use client";
import NameComponent from "@/components/name-component";
import QuickLinksHome from "@/components/quick-links-home";
import QuickJobsHome from "@/components/quick-jobs-home";
import QuickProjectsHome from "@/components/quick-projects-home";
import ThisSite from "@/components/this-site";
import Magnets from "@/components/magnets";
import WindowComponent from "@/components/window";
export default function Home() {
  return (
    <div className="font-mono w-10/12 mx-auto mt-14">
      <section>
        <section className="flex items-start flex-col-reverse lg:flex-row gap-2">
          <section className="lg:w-10/12">
          <h1 className="text-4xl lg:text-5xl leading-loose">Hey! I&apos;m <NameComponent /></h1>
          <p className="text-md lg:text-xl lg:w-10/12 leading-relaxed mb-8">A student building and securing web infrastructure. I've written software that is trusted by The United Nations, The Linux Foundation, Arch Linux, GNOME, Wine, FFmpeg and many others[1]. My code is used by millions of people worldwide.
          I focus on backend web development, scalable and distributed systems, DevOps, and cybersecurity, especially crafting defenses against automated threats. I enjoy leading initiatives and tackling complex technical challenges.</p>
          <QuickLinksHome />
          <QuickJobsHome />
          </section>
        <WindowComponent/>
        </section>
        <QuickProjectsHome /> 
        <ThisSite />
        <Magnets /> 
      </section>
    </div>
  );
}
