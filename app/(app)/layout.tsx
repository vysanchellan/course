import { getCurrentUser } from "@/lib/actions/auth";
import { getAccessLevel } from "@/lib/access";
import { Navbar } from "@/components/layout/navbar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const accessLevel = await getAccessLevel();

  return (
    <div className="min-h-screen bg-dusk">
      <Navbar variant="app" user={user} accessLevel={accessLevel} />
      <div className="flex">
        <AppSidebar accessLevel={accessLevel} />
        <main className="flex-1 min-w-0 pb-20 lg:pb-0">{children}</main>
      </div>
      <MobileNav accessLevel={accessLevel} />
    </div>
  );
}
