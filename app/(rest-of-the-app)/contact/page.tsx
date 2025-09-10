export default function Contact(){
  return (
    <main className="w-11/12 lg:w-10/12 mx-auto py-16">
      <h1 className="text-4xl lg:text-5xl font-mono text-gray-200 mb-4">contact</h1>
      <p className="text-gray-400 mb-8">For the fastest response, please reach out by email.</p>

      <ul className="space-y-4 text-xl text-gray-300">
        <li>
          <a href="mailto:you@example.com" className="hover:text-white underline decoration-dotted hover:decoration-solid">email ↗</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/your-handle" target="_blank" className="hover:text-white underline decoration-dotted hover:decoration-solid">linkedin ↗</a>
        </li>
        <li>
          <a href="https://x.com/your-handle" target="_blank" className="hover:text-white underline decoration-dotted hover:decoration-solid">x ↗</a>
        </li>
      </ul>
    </main>
  )
}


