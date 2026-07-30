import { Navbar } from "@/components/layout/navbar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-dusk">
      <Navbar variant="app" />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 min-w-0 pb-20 lg:pb-0">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
