import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Sidebar collapsed={sidebarCollapsed} />
      <main
        className={`pt-14 transition-all duration-200 ${
          sidebarCollapsed ? "ml-[72px]" : "ml-60"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
