import { Metadata } from "next";

export const metadata: Metadata = {
    title: "contact",
    description: "contact page for the portfolio",
  };
export default function HomeGroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}


