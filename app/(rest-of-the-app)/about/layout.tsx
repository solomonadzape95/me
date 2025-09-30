import { Metadata } from "next";

export const metadata: Metadata = {
    title: "about",
    description: "about page for the portfolio",
  };
export default function HomeGroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}


