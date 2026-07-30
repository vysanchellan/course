import { getCurrentUser } from "@/lib/actions/auth";
import { Navbar } from "@/components/layout/navbar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-dusk">
      <Navbar variant="app" user={user} />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 min-w-0 pb-20 lg:pb-0">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
