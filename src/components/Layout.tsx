import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProtectedRoute } from "./ProtectedRoute";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 flex items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center justify-between w-full">
                <h1 className="text-xl font-bold text-foreground">
                  Sistema Unificado de Gestão Municipal
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  IA Gerenciando
                </div>
              </div>
            </header>
            <div className="flex-1 p-6">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};
