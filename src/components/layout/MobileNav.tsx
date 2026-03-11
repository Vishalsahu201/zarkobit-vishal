import { Home, Flame, Film, ScanFace, Scissors, CalendarCheck, Crown, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Film, label: "Reels", path: "/reels" },
  { icon: ScanFace, label: "Scan", path: "/face-scan" },
  { icon: Scissors, label: "Services", path: "/services" },
  { icon: CalendarCheck, label: "Bookings", path: "/bookings" },
];

const MobileNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-background/95 backdrop-blur-md px-2 py-1.5 safe-bottom">
      {navItems.map(({ icon: Icon, label, path }) => {
        const active = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] transition-colors ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className={`h-5 w-5 ${active ? "text-primary" : ""}`} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
