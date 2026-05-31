import { CascadeName } from "@/components/cascade-name";
import { Section, SiteShell } from "@/components/site-shell";
import { PDFViewer } from "@/components/pdf-viewer";

export const metadata = {
  title: "Resume",
};

const RESUME_PATH = "/content/resume/resume.pdf";


export default function ResumePage() {
  return (
    <SiteShell>
      <header className="space-y-5 mb-4">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="font-display font-light leading-[1.05] tracking-tight text-(--color-ink) text-[clamp(2rem,5vw,3.25rem)]">
            <CascadeName text="My portfolio, in a single document." />
          </h1>
        </div>
      </header>

      <Section label="document">
        <div className="rule-top rule-bottom">
          <PDFViewer url={RESUME_PATH} downloadName="solomon-adzape-resume.pdf" />
        </div>
      </Section>
    </SiteShell>
  );
}

