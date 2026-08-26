import Image from "next/image";
import {
  SiCursor,
  SiFigma,
  SiGit,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSolidity,
  SiSupabase,
  SiTailwindcss,
  SiTauri,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Tool = {
  label: string;
  icon?: IconType;
  color?: string;
  asset?: string;
};

const TOOLS: Tool[] = [
  { label: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { label: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { label: "React", icon: SiReact, color: "#61dafb" },
  { label: "Next.js", icon: SiNextdotjs, color: "#f4f2ec" },
  { label: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
  { label: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
  { label: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
  { label: "Python", icon: SiPython, color: "#ffd43b" },
  { label: "Tauri", icon: SiTauri, color: "#ffc131" },
  { label: "Git", icon: SiGit, color: "#f05032" },
  { label: "Vercel", icon: SiVercel, color: "#f4f2ec" },
  { label: "Figma", icon: SiFigma, color: "#f24e1e" },
  { label: "Cursor", icon: SiCursor, color: "#f4f2ec" },
  { label: "Postman", icon: SiPostman, color: "#ff6c37" },
  { label: "Supabase", icon: SiSupabase, color: "#3fcf8e" },
  { label: "Solidity", icon: SiSolidity, color: "#9a9aa8" },
  { label: "After Effects", asset: "/tool-icons/after-effects.svg" },
  { label: "Illustrator", asset: "/tool-icons/illustrator.svg" },
  { label: "Cavalry", asset: "/tool-icons/cavalry.svg" },
];

export const ToolChipGrid = () => (
  <ul className="flex flex-wrap gap-3" aria-label="Tools and technologies">
    {TOOLS.map(({ label, icon: ToolIcon, color, asset }) => (
      <li
        key={label}
        className="inline-flex items-center gap-3 rounded-[12px] bg-[#151515] px-4 py-3 text-[0.94rem] font-medium text-[#f4f2ec] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.035)]"
      >
        {asset ? (
          <Image src={asset} alt="" width={21} height={21} aria-hidden="true" />
        ) : ToolIcon ? (
          <ToolIcon size={21} color={color} aria-hidden="true" />
        ) : null}
        <span>{label}</span>
      </li>
    ))}
  </ul>
);
