"use client";
import NameComponent from "@/components/name-component";
import QuickLinksHome from "@/components/quick-links-home";
import QuickJobsHome from "@/components/quick-jobs-home";
import QuickProjectsHome from "@/components/quick-projects-home";
import ThisSite from "@/components/this-site";
import Magnets from "@/components/magnets";
import WindowComponent from "@/components/window";
import Tools from "@/components/tools";
export default function About() {
  return (
    <div className="font-mono w-11/12 mx-auto mt-14">
      <section>
        <section className="flex items-start flex-col-reverse lg:flex-row gap-2">
          <section className="lg:w-11/12">
          <h1 className="text-4xl lg:text-5xl leading-loose font-thin">Hey! I&apos;m Solomon</h1>
          <p className="text-md lg:text-xl lg:w-10/12 leading-relaxed mb-8 font-thin">I'm a student, and I build stuff. My interests are computer science, tech, engineering and sports. I (currently) focus on web development and enjoy working with AI tools, data, and the blockchain. I'm excited to understand how things work so I enjoy planning out and building scalable systems. I also enjoy solving puzzles and tackling complex problems.</p>
          <QuickLinksHome />
          <QuickJobsHome />
          </section>
        <WindowComponent/>
        </section>
        <Tools />
        <QuickProjectsHome /> 
        <ThisSite />
        <Magnets /> 
      </section>
    </div>
  );
}
