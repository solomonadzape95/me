"use client"
import { Timestamp } from "next/dist/server/lib/cache-handlers/types"
import React, { useContext, createContext, useState, useEffect } from "react"

interface ContextProps {
    regionalTime: String | null
    updatedAt: number
    isWindowOpen: boolean
    setWindowOpen: (open: boolean) => void
}
const MainContext = createContext<ContextProps | null>(null)

export const MainContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [regionalTime, setRegionalTime] = useState<String | null>(null)
    const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false)
    const [updatedAt, setUpdatedAt] = useState<number>(Date.now())
    
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

    const updateTime = () => {
        const time = findLocalTime();
        setRegionalTime(time);
        setUpdatedAt(Date.now());
    }

    useEffect(() => {
        // Initial time update
        updateTime();
        
        // Set up interval to update every 5 minutes (300000 ms)
        const interval = setInterval(updateTime, 300000);
        
        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [])

    const contextValue: ContextProps = {
        regionalTime: regionalTime,
        updatedAt: updatedAt,
        isWindowOpen: isWindowOpen,
        setWindowOpen: setIsWindowOpen
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