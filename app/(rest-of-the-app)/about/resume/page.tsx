export default function ResumePage() {
    return (
      <main className="w-11/12 lg:w-10/12 mx-auto">
        <h1 className="text-2xl text-gray-200 mb-4">resume</h1>
        <div className="w-full h-[80vh] border border-gray-50/20">
          <iframe src="/content/resume/resume.pdf" className="w-full h-full" />
        </div>
        <a href="/content/resume/resume.pdf" target="_blank" className="mt-4 inline-block text-blue-400 hover:underline">
          Open in new tab ↗
        </a>
      </main>
    );
  }