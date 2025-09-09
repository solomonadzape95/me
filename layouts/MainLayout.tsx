"use client"

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { MainContextProvider } from "@/contexts/MainContext";
export default function MainLayout({children}: {children: React.ReactNode}) {

    return (
        <MainContextProvider>
        <div className="scrollbar-none">
            <Header/>
            <main className="flex flex-col min-h-screen font-mono overflow-y-auto scrollbar-none">
                {children}
            </main>
           <Footer/>
        </div>
        </MainContextProvider>
    )
}