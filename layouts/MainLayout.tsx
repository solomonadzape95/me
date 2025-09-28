"use client"

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { MainContextProvider, useMain } from "@/contexts/MainContext";

function LayoutContent({children}: {children: React.ReactNode}) {
    const { isWindowOpen } = useMain() as { isWindowOpen: boolean };

    return (
        <div className={`scrollbar-none transition-all duration-500 ease-in-out ${
            isWindowOpen ? 'brightness-100' : 'brightness-75'
        }`}>
            <Header/>
            <main className="flex flex-col min-h-screen font-mono overflow-y-auto scrollbar-none">
                {children}
            </main>
            <Footer/>
        </div>
    );
}

export default function MainLayout({children}: {children: React.ReactNode}) {
    return (
        <MainContextProvider>
            <LayoutContent>{children}</LayoutContent>
        </MainContextProvider>
    )
}