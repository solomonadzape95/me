
const langs = [
  "html", "css/scss", "js/ts","python", "solidity", "bash", "sql"
]
const dbs = [
    "postgresql", "mongodb", "firestore"
  ]
  const niches = [
    "frontend", "backend", "web3", "motion-design",
  ]
const frameworks = [
    "git", "reactjs", "nodejs","tailwind", "express", "nextjs", "fastapi","vercel"
  ]
  const software = [
    "vscode", "cursor", "remix","postman", "linux", "adobe ae", "adobe ai",
  ]
export default function Tools() {
    return (
        <div className="mt-10 pt-10">
       <span className="flex items-center justify-between gap-2"><h1 className="text-2xl lg:text-4xl">tools</h1> </span>
        <div className="flex flex-col items-center gap-3 lg:grid lg:grid-cols-5 lg:grid-rows-3 lg:gap-5 xl:gap-10 mt-5 w-full">
        <VerticalCard title="langs" content={langs}/>
        <VerticalCard title="frameworks" content={frameworks}/>

        <HorizontalCard title="dbs" content={dbs}/>
        <HorizontalCard title="software" content={software}/>
        <HorizontalCard title="niches" content={niches}/>
       
        </div>
    </div>
    )
}

function HorizontalCard({title, content } : {title: string, content: string[]}){
return   <span className="col-span-3 mb-2 w-full h-[15vh] border-2 border-gray-50/20 cursor-default hover:transition-all hover:duration-300 grid place-items-center overflow-hidden group grid place-items-center px-2">
<span className="flex flex-col items-center gap-2 "><h1 className="text-gray-500 text-md flex items-center">{title} </h1>
<div className="flex items-center flex-wrap justify-evenly gap-4 lg:gap-10 xl:text-2xl text-center">
{content.map(db => <p key={db} className="xl:text-2xl max-w-11/12">{db}</p>)}
</div>
</span>
</span>
}
function VerticalCard({title, content } : {title: string, content: string[]}){
    return   <span className="min-h-[35vh] lg:h-full lg:row-span-full mb-2 w-full border-2 border-gray-50/20 cursor-default hover:transition-all hover:duration-300 grid place-items-center overflow-hidden"> <span className="flex flex-col items-center gap-2 "><h1 className="text-gray-500 text-md flex items-center">{title}</h1>
    {content.map(item => <p key={item} className="xl:text-2xl max-w-11/12">{item}</p>)}
    </span></span>
    }