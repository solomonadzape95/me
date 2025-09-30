"use client"

import { findDistance } from "@/lib/helpers";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export function RouteChangeLayout({children}: {children: React.ReactNode}){
    const prevPathRef = useRef<string | null>(null);
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    const [distance, setDistance] = useState<{x: number, y: number}>({x: 0, y: 0});
    const [translate, setTranslate] = useState<{x: number, y: number}>({x: 0, y: 0});
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        setHasMounted(true);
    },[]);

    useEffect(() => {
        if (!hasMounted) return;
        const from = prevPathRef.current;
        const to = pathname;
        if(from !== null && to !== from){
            const [x, y] = findDistance(from || "", to);
            setDistance({x, y});

            // Derived translate based on direction
            const SCALE = 1000; 
            const start = { x: x * SCALE, y: y * SCALE };
            setTranslate(start);
            setIsAnimating(true);

            // Kick off animation to settle at 0,0 on next frame
            const id = requestAnimationFrame(() => {
                setTranslate({ x: 0, y: 0 });
            });
            return () => cancelAnimationFrame(id);
        }
        prevPathRef.current = pathname;
    }, [pathname, hasMounted]);

    if (!hasMounted) {
        return null;
    }

    const {x, y} = distance;
    const shouldAnimate = isAnimating && (x !== 0 || y !== 0);

    const baseClasses = "will-change-transform transition-transform duration-500 ease-out";
    const opacityClasses = shouldAnimate ? "opacity-100" : "opacity-100"; 

    return (
        <main
            key={pathname}
            className={`${baseClasses} ${opacityClasses}`}
            style={{ transform: `translate3d(${translate.x}px, ${translate.y}px, 0)` }}
            onTransitionEnd={() => { if (isAnimating) setIsAnimating(false); }}
        >
            {children}
        </main>
    );
}