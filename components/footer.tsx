import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Footer(){
    return  <footer className="mt-14 mb-2 w-11/12 mx-auto flex items-center flex-col lg:flex-row justify-evenly lg:justify-between border-2 border-gray-50/50 h-[100px] lg:h-[60px] bg-[#131313] font-mono px-4">
    <section className="flex items-center divide-x-[1px] space-x-4">
      <span className="text-xs flex items-center gap-2 pr-4">
       <ChevronLeftIcon className="w-4 h-4 cursor-pointer text-gray-400 hover:text-white duration-300"/> webrings:cpt <ChevronRightIcon  className="w-4 h-4 cursor-pointer text-gray-400 hover:text-white duration-300"/>
        </span>
      <span className="ml-2 text-xs text-gray-400 pr-4">45 visits</span>
    </section>

    <section className="flex items-center divide-x-[1px] space-x-4">
      <span className="text-xs flex items-center gap-2 pr-4">
        <span
          className="w-3 h-3 rounded-full bg-green-400 animate-pulse border-2 border-green-700 shadow-lg"
          title="All Systems Active"
        ></span>
        All Systems Active
      </span>
      <span className="lg:ml-2 text-xs text-gray-400">&copy; {new Date().getFullYear()} Solomon Adzape</span>
    </section>
</footer>
}