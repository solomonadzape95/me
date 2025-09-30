import { Metadata } from "next";

export const metadata: Metadata = {
    title: "projects",
    description: "projects page for the portfolio",
  };
export default function HomeGroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}


