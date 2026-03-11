import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      {!isMobile && <Sidebar collapsed={sidebarCollapsed} />}
      <main
        className={`pt-14 transition-all duration-200 ${
          isMobile ? "ml-0 pb-16" : sidebarCollapsed ? "ml-[72px]" : "ml-60"
        }`}
      >
        <Outlet />
      </main>
      {isMobile && <MobileNav />}
    </div>
  );
};

export default MainLayout;
