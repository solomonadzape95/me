import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import ColorPalette from "./color-palette";
const items = [
  {name:"code", item: "github repo"},
  {name:"stats", item: "umami"},
  {name:"font", item: "jetbrains mono"},
  {name:"webring", item: "catpuccin"},
]
const stack = [
  "nextjs", "tailwind", "umami", "vercel", "markdown"
]
export default function ThisSite() {
    return (
        <div className="mt-5 py-10">
       <span className="flex items-center justify-between gap-2"><h1 className="text-2xl lg:text-4xl">this site</h1> </span>
        <div className="flex flex-col items-center gap-3 lg:grid lg:grid-cols-5 lg:grid-rows-3 lg:gap-5 xl:gap-10 mt-5 w-full">

        <span className="h-[30vh] lg:h-full lg:row-span-full mb-2 w-full border-2 border-gray-50/20 cursor-default hover:transition-all hover:duration-300 grid place-items-center overflow-hidden"> <span className="flex flex-col items-center gap-2 "><h1 className="text-gray-500 text-md flex items-center">stack</h1>
        {stack.map(item => <p key={item} className=" xl:text-2xl max-w-11/12">{item}</p>)}
        
        </span></span>

        {items.map((item) => <span key={item.item} className="col-span-1 mb-2 w-full h-[15vh] border-2 border-gray-50/20 hover:border-gray-200 cursor-pointer hover:transition-all hover:duration-300 grid place-items-center overflow-hidden group grid place-items-center">
        <span className="flex flex-col items-center gap-2 "><h1 className="text-gray-500 text-md flex items-center">{item.name} <ArrowLongRightIcon className="w-4  h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" /></h1>
        <p className=" xl:text-2xl">{item.item}</p></span>
        </span>)}
       
        <span className="col-span-4 mb-2 w-full h-[15vh] border-2 border-gray-50/20 cursor-default hover:transition-all hover:duration-300 grid place-items-center overflow-hidden group grid place-items-center">
        <span className="flex flex-col items-center gap-2 w-11/12 lg:w-auto mx-auto"><h1 className="text-gray-500 text-md flex items-center">colors </h1>
        <ColorPalette/></span>
        </span>
        <span className="col-span-4 mb-2 w-full h-[15vh] border-2 border-gray-50/20 cursor-default hover:transition-all hover:duration-300 grid place-items-center overflow-hidden group grid place-items-center">
        <span className="flex flex-col items-center gap-2 "><h1 className="text-gray-500 text-md flex items-center">inspo </h1>
        <div className="flex items-center flex-wrap justify-evenly gap-4 lg:gap-10  xl:text-2xl text-center">
          <a
            href="https://catppuccin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline duration-300"
          >
            json.dev
          </a>
          <a
            href="https://leerob.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline duration-300"
          >
           refact0r.dev
          </a>
          <a
            href="https://rauchg.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline duration-300"
          >
            tnixc.space
          </a>
        </div>
        </span>
        </span>
        </div>
    </div>
    )
}