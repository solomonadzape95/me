"use client"
import Sky from "./sky"

export default function WindowComponent(){
    return (
        <div className="lg:w-[35vw] lg:h-[50vh] w-full h-[25vh] border-2 border-gray-50/50">
            <Sky />
        </div>
    )
}