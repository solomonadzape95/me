"use client"
import { Shutters } from "./shutters"
import Sky from "./sky"

export default function WindowComponent(){
    return (
        <div className="lg:w-[35vw] lg:h-[50vh] w-full h-[25vh] border-2 border-gray-50/50">
            <Shutters  shutterColor="#2D1B14"
              slatsCount={10}
              animationDuration="1000ms"
              className="h-full"><Sky /></Shutters>
        </div>
    )
}