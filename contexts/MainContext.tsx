"use client"
import { Timestamp } from "next/dist/server/lib/cache-handlers/types"
import React, { useContext, createContext, useState, useEffect } from "react"

interface ContextProps {
    regionalTime: String | null
    updatedAt: number
}
const MainContext = createContext<ContextProps | null>(null)

export const MainContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [regionalTime, setRegionalTime] = useState<String | null>(null)
    let updatedAt
    const findLocalTime = () => {
        const d = new Date()
        const offset = +1;
        const localTime = d.getTime();
        const localOffset = d.getTimezoneOffset() * 60000;
        const utc = localOffset + localTime;
        const regional = utc + (3600000 * offset);
        const date = new Date(regional);
        // Get time in 24hr format
        const timeString = date.toLocaleTimeString([], { hour12: false });
        console.log(timeString);
        return timeString;

    }
    useEffect(() => {
        if (updatedAt && updatedAt - Date.now() <= 300000) return
        const time = findLocalTime();
        setRegionalTime(time)
    })
    const contextValue: ContextProps = {
        regionalTime: regionalTime,
        updatedAt: updatedAt || Date.now()
    };

    return (
        <MainContext.Provider value={contextValue}>
            {children}
        </MainContext.Provider>
    );
};

export const useMain = () => {
    const context = useContext(MainContext)
    if (!context) return "Main Context Soould not be used outside Main Context Provider"
    return context
}