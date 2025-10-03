// import type { Metadata } from "next";
import { JetBrains_Mono} from "next/font/google";
import "./globals.css";
import { MainContextProvider } from "@/contexts/MainContext";
import { RouteChangeLayout } from "@/layouts/RouteChange";

const jetBrainsMonoMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-none">
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="eec0ba25-604f-4991-ab62-eb9a1c7446f1"></script>

      </head>
      <body
        className={`${jetBrainsMonoMono.variable} antialiased bg-dark font-mono scrollbar-none h-auto`}
      >
        <RouteChangeLayout>
        <MainContextProvider>
        {children} 
        </MainContextProvider>
        </RouteChangeLayout>
      </body>
    </html>
  );
}
