import { CascadeName } from "@/components/cascade-name";
import { Section, SiteShell } from "@/components/site-shell";

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
          <a
            href={RESUME_PATH}
            download
            className="label-mono link-underline normal-case tracking-[0.06em] shrink-0"
          >
            download pdf
          </a>
        </div>
      </header>

      <Section label="document">
        <div className="rule-top rule-bottom">
          <object
            data={RESUME_PATH}
            type="application/pdf"
            aria-label="Solomon Adzape — resume PDF"
            className="block w-full h-[80vh] min-h-[640px] bg-(--color-paper)"
          >
            <p className="p-8 text-(--color-ink-soft)">
              Your browser couldn&apos;t render the embedded PDF.{" "}
              <a href={RESUME_PATH} className="link-underline">
                Open the resume directly →
              </a>
            </p>
          </object>
        </div>
      </Section>
    </SiteShell>
  );
}
