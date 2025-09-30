import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const nice = params.slug.replace(/-/g, " ");
    return { title: nice };
  }
export default function HomeGroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}


