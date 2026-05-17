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
  metadataBase: new URL("https://solenoid.me"),
  title: {
    default: "Solomon Adzape — solenoid",
    template: "%s · Solomon Adzape",
  },
  description:
    "Solomon Adzape — frontend engineer and founding engineer based in Lagos. Selected work, writing, and contact.",
  openGraph: {
    title: "Solomon Adzape — solenoid",
    description:
      "Solomon Adzape — frontend engineer and founding engineer based in Lagos.",
    url: "https://solenoid.me",
    siteName: "solenoid.me",
    images: ["/content/images/file.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@solenoid",
    title: "Solomon Adzape — solenoid",
    description:
      "Solomon Adzape — frontend engineer and founding engineer based in Lagos.",
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
