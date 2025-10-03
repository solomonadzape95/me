"use client";
import { useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { uploadProjectAction } from "./actions";

export default function UploadProject() {
  const [preview, setPreview] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <main className="w-11/12 lg:w-8/12 mx-auto py-10">
      <h1 className="text-3xl lg:text-4xl font-mono text-gray-200 mb-6">upload project</h1>
      <form
        action={(fd) => {
          startTransition(async () => {
            setMessage(null);
            try {
              const res = await uploadProjectAction(fd);
              setMessage(res.ok ? `saved: /projects/${res.slug}` : "failed");
            } catch (e) {
              const message = typeof e === "object" && e && "message" in e ? String((e as {message?: string}).message) : "failed";
              setMessage(message);
            }
          });
        }}
        className="grid gap-6"
      >
        <div className="grid gap-2">
          <label className="text-gray-300">title</label>
          <input name="title" className="bg-transparent border border-gray-50/20 px-3 py-2 rounded" />
        </div>
        <div className="grid gap-2">
          <label className="text-gray-300">slug</label>
          <input required name="slug" className="bg-transparent border border-gray-50/20 px-3 py-2 rounded" />
        </div>
        <div className="grid gap-2">
          <label className="text-gray-300">description</label>
          <input name="description" className="bg-transparent border border-gray-50/20 px-3 py-2 rounded" />
        </div>
        <div className="grid gap-2 md:grid-cols-2 md:gap-6">
          <div className="grid gap-2">
            <label className="text-gray-300">site (optional)</label>
            <input name="site" className="bg-transparent border border-gray-50/20 px-3 py-2 rounded" />
          </div>
          <div className="grid gap-2">
            <label className="text-gray-300">repo (optional)</label>
            <input name="repo" className="bg-transparent border border-gray-50/20 px-3 py-2 rounded" />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-gray-300">date (dd/mm/yyyy)</label>
          <input
            name="date"
            type="text"
            pattern="\d{2}/\d{2}/\d{4}"
            placeholder="dd/mm/yyyy"
            className="bg-transparent border border-gray-50/20 px-3 py-2 rounded"
            title="Please use the format dd/mm/yyyy"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-gray-300">images (multiple)</label>
          <input name="images" type="file" multiple accept="image/*" className="text-gray-200" />
          <p className="text-sm text-gray-500">images will be saved under /public/content/projects/&lt;slug&gt;/</p>
        </div>

        <div className="grid gap-2">
          <label className="text-gray-300">markdown content</label>
          <textarea
            name="content"
            rows={10}
            onChange={(e) => setPreview(e.target.value)}
            className="bg-transparent border border-gray-50/20 px-3 py-2 rounded min-h-[220px]"
            placeholder={"## idea\n...\n\n## implementation\n...\n\n## thoughts\n..."}
          />
        </div>

        <button disabled={isPending} className="border border-gray-50/30 px-4 py-2 rounded hover:bg-white/5 transition">
          {isPending ? "saving..." : "save project"}
        </button>

        {message && <div className="text-sm text-gray-400">{message}</div>}
      </form>

      <section className="mt-10">
        <h2 className="text-xl font-mono text-gray-200 mb-3">preview</h2>
        <article className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{preview}</ReactMarkdown>
        </article>
      </section>
    </main>
  );
}


