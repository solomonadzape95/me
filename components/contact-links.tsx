"use client";

import {
  ArrowUpRight,
  DiscordLogo,
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
  type Icon,
} from "@phosphor-icons/react";

type ContactLink = {
  label: string;
  value: string;
  mobileValue: string;
  href: string;
  icon: Icon;
};

const LINKS: ContactLink[] = [
  {
    label: "email",
    value: "adzapesolomon@gmail.com",
    mobileValue: "adzapesolomon@gmail.com",
    href: "mailto:adzapesolomon@gmail.com",
    icon: EnvelopeSimple,
  },
  {
    label: "github",
    value: "github.com/solomonadzape95",
    mobileValue: "solomonadzape95",
    href: "https://github.com/solomonadzape95",
    icon: GithubLogo,
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/solomonadzape",
    mobileValue: "solomonadzape",
    href: "https://www.linkedin.com/in/solomonadzape/",
    icon: LinkedinLogo,
  },
  {
    label: "x / twitter",
    value: "x.com/0xsolenoid",
    mobileValue: "0xsolenoid",
    href: "https://x.com/0xsolenoid",
    icon: XLogo,
  },
  {
    label: "instagram",
    value: "instagram.com/0xsolenoid",
    mobileValue: "0xsolenoid",
    href: "https://www.instagram.com/0xsolenoid/",
    icon: InstagramLogo,
  },
  {
    label: "discord",
    value: "discordapp.com/users/0xsolenoid",
    mobileValue: "0xsolenoid",
    href: "https://discordapp.com/users/0xsolenoid",
    icon: DiscordLogo,
  },
];

export const ContactLinks = () => (
  <ul className="space-y-2">
    {LINKS.map(({ label, value, mobileValue, href, icon: LinkIcon }) => (
      <li key={label}>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="group grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-4 rounded-[10px] px-1 py-4 transition-colors hover:bg-(--color-accent-soft) sm:grid-cols-[3rem_8rem_minmax(0,1fr)_auto] sm:px-4"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full border border-(--color-rule) text-(--color-ink-soft) transition-colors group-hover:border-(--color-accent) group-hover:text-(--color-accent)">
            <LinkIcon size={20} weight="duotone" aria-hidden="true" />
          </span>
          <span className="label-mono hidden sm:block">{label}</span>
          <span className="min-w-0 text-[0.9rem] text-(--color-ink) sm:text-[0.96rem]">
            <span className="sm:hidden">{mobileValue}</span>
            <span className="hidden sm:inline">{value}</span>
          </span>
          <ArrowUpRight
            size={18}
            weight="bold"
            className="text-(--color-ink-soft) transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--color-accent)"
            aria-hidden="true"
          />
        </a>
      </li>
    ))}
  </ul>
);
