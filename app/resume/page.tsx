import type { Metadata } from "next";

import { Section, SiteShell } from "@/components/site-shell";
import { PDFViewer } from "@/components/pdf-viewer";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "View or download Solomon Adzape's software engineering resume, including product experience, technical skills, and selected projects.",
  alternates: { canonical: "/resume" },
  openGraph: { url: "/resume" },
};

const RESUME_PATH = "/content/resume/resume.pdf";


export default function ResumePage() {
  return (
    <SiteShell>
      <header className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="page-title">my work, on paper.</h1>
        </div>
      </header>

      <Section label="document">
        <div>
          <PDFViewer url={RESUME_PATH} downloadName="solomon-adzape-resume.pdf" />
        </div>
      </Section>
    </SiteShell>
  );
}
