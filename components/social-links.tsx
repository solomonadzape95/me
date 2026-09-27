import {
  DiscordLogo,
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { CSSProperties } from "react";

type SocialLink = {
  label: string;
  href: string;
  color: string;
  icon: Icon;
  newTab?: true;
};

const SOCIALS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/solomonadzape95",
    color: "#343941",
    icon: GithubLogo,
    newTab: true,
  },
  {
    label: "X",
    href: "https://x.com/0xsolenoid",
    color: "#202328",
    icon: XLogo,
    newTab: true,
  },
  {
    label: "Email",
    href: "mailto:adzapesolomon@gmail.com",
    color: "#71462f",
    icon: EnvelopeSimple,
  },
  {
    label: "Discord",
    href: "https://discordapp.com/users/0xsolenoid",
    color: "#4b4f86",
    icon: DiscordLogo,
    newTab: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/solomonadzape/",
    color: "#28545a",
    icon: LinkedinLogo,
    newTab: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/0xsolenoid/",
    color: "#684536",
    icon: InstagramLogo,
    newTab: true,
  },
];

export const SocialLinks = () => (
  <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
    {SOCIALS.map(({ label, href, color, icon: SocialIcon, newTab }) => (
      <li key={label}>
        <a
          href={href}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noreferrer" : undefined}
          aria-label={label}
          title={label}
          style={{ "--social-color": color } as CSSProperties}
          className="group grid h-24 place-items-center rounded-[12px] bg-(--social-color) text-white transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1"
        >
          <SocialIcon
            size={28}
            weight="duotone"
            className="transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110"
            aria-hidden="true"
          />
        </a>
      </li>
    ))}
  </ul>
);
