import SiteLayout from "@/layouts/MainLayout";

export default function MainAppLayout({children}: Readonly<{children: React.ReactNode}>){
  return <SiteLayout>{children}</SiteLayout>
}