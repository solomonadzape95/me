import ProjectCard from "./project-card";

const featured = [
    { title: "envelope", description: "a cli tool for securely sharing env secrets with cryptography", image: "/content/projects/envelope/ascii-art-text.png", link: "/projects/envelope", date: "2025-09-16" },
    { title: "jotter", description: "an ai-powered tool for creating notes and assessments from lesson audios", image: "/content/projects/jotter/Screenshot_From_2025-10-03_14-28-55.png", link: "/projects/jotter", date: "2025-07-03" },
  ];
  
  export default function QuickProjectsHome() {
    return (
      <div className="mt-5 py-20">
        <span className="flex items-center justify-between gap-2">
          <h1 className="text-2xl lg:text-4xl">featured projects</h1>
          <span className="text-sm text-gray-500 hover:text-gray-300 cursor-pointer flex items-center gap-2 group duration-300">
            view all
          </span>
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          {featured.map(p => (
            <ProjectCard key={p.link} {...p} />
          ))}
        </div>
      </div>
    );
  }