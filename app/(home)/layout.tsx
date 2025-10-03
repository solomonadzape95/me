import { Metadata } from "next";

export const metadata: Metadata = {
    title: "solenoid",
    description: "portfolio homepage",
  };
export default function HomeGroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="font-mono w-11/12 mx-auto mt-14 h-full lg:h-auto overflow-hidden">
            {children}
        </div>
    );
}


