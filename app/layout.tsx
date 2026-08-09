import type { Metadata, Viewport } from "next";
import { Spectral, DM_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import { CommandPaletteMount } from "@/components/command-palette-mount";
import { MobileNav } from "@/components/mobile-nav";
import { NowPlayingProvider } from "@/components/now-playing";
import { RouteAnimator } from "@/components/route-animator";
import { SiteRail } from "@/components/site-rail";
import { ThemeBootstrap } from "@/components/theme-bootstrap";

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thesolenoid.space"),
  title: {
    default: "Solomon Adzape (solenoid) — Software Engineer",
    template: "%s · Solomon Adzape",
  },
  description:
    "Portfolio of Solomon Adzape (solenoid), a software engineer building AI, desktop, fintech, and onchain products with React, Next.js, TypeScript, Node.js, and Rust.",
  applicationName: "Solomon Adzape — Software Engineer",
  authors: [{ name: "Solomon Adzape", url: "https://www.thesolenoid.space" }],
  creator: "Solomon Adzape",
  publisher: "Solomon Adzape",
  category: "technology",
  keywords: [
    "Solomon Adzape",
    "solenoid",
    "software engineer",
    "product engineer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "Nigeria software engineer",
    "AI engineer",
    "fintech engineer",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Solomon Adzape (solenoid) — Software Engineer",
    description:
      "Software engineer building AI, desktop, fintech, and onchain products.",
    url: "https://www.thesolenoid.space",
    siteName: "Solomon Adzape",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@0xsolenoid",
    title: "Solomon Adzape (solenoid) — Software Engineer",
    description:
      "Software engineer building AI, desktop, fintech, and onchain products.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e6" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1a16" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.thesolenoid.space/#person",
        name: "Solomon Adzape",
        alternateName: "solenoid",
        url: "https://www.thesolenoid.space",
        image: "https://www.thesolenoid.space/content/images/file.jpg",
        jobTitle: "Software Engineer",
        email: "mailto:adzapesolomon@gmail.com",
        sameAs: [
          "https://github.com/solomonadzape95",
          "https://www.linkedin.com/in/solomonadzape/",
          "https://x.com/0xsolenoid",
        ],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "Rust",
          "Artificial intelligence",
          "Financial technology",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.thesolenoid.space/#website",
        url: "https://www.thesolenoid.space",
        name: "Solomon Adzape — Software Engineer",
        alternateName: "solenoid",
        inLanguage: "en",
        author: { "@id": "https://www.thesolenoid.space/#person" },
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spectral.variable} ${dmMono.variable}`}
    >
      <head>
        <ThemeBootstrap />
      </head>
      <body className="font-body text-base text-(--color-ink) bg-(--color-paper)">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <NowPlayingProvider>
          <div className="w-full max-w-[92rem] px-6 lg:pl-16 lg:pr-12 py-10 lg:py-16 overflow-x-clip">
            <div className="lg:grid lg:gap-x-14 lg:grid-cols-[14rem_minmax(0,1fr)]">
              {/* Rail is desktop-only. On smaller viewports MobileNav renders
                  the floating buttons + drawer instead. */}
              <aside className="hidden lg:block lg:sticky lg:top-12 lg:self-start">
                <SiteRail />
              </aside>
              <main className="min-w-0">
                <RouteAnimator>{children}</RouteAnimator>
              </main>
            </div>
          </div>
          <MobileNav />
          <CommandPaletteMount />
        </NowPlayingProvider>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="eec0ba25-604f-4991-ab62-eb9a1c7446f1"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
