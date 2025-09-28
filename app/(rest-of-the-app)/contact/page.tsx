const contact = [
  {link: "mailto:adzapesolomon@gmail.com", name:"email"},
  {link: "https://www.linkedin.com/in/solomonadzape", name:"linkedin"},
  {link: "https://x.com/0xsolenoid", name:"X"},
  {link: "https://github.com/solomonadzape95", name:"github"},

]
export default function Contact(){
  return (
    <main className="w-11/12 lg:w-10/12 mx-auto py-16">
      <h1 className="text-4xl lg:text-5xl font-mono text-gray-200 mb-4">contact</h1>
      <p className="text-gray-400 mb-8">For the fastest response, please reach out by email.</p>

      <ul className="space-y-4 text-xl text-gray-300">
       {contact.map(c =>  <li key={c.link}>
          <a href={c.link} className="hover:text-white underline decoration-dotted hover:decoration-solid">{c.name} ↗</a>
        </li>)}
        
      </ul>
    </main>
  )
}


