import {
  Home, Flame, Scissors, ScanFace, User, CalendarCheck,
  Heart, Clock, ChevronDown, Sparkles, Film, Star, Store
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { salonList } from "@/data/mockData";

interface SidebarProps {
  collapsed: boolean;
}

const mainLinks = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Flame, label: "Trending", path: "/trending" },
  { icon: Film, label: "Reels", path: "/reels" },
  { icon: Scissors, label: "Services", path: "/services" },
  { icon: ScanFace, label: "AI Face Scan", path: "/face-scan" },
  { icon: CalendarCheck, label: "Bookings", path: "/bookings" },
];

const personalLinks = [
  { icon: User, label: "My Profile", path: "/profile" },
  { icon: Heart, label: "Favorites", path: "/favorites" },
  { icon: Clock, label: "History", path: "/history" },
  { icon: Star, label: "My Reviews", path: "/reviews" },
];

const exploreLinks = [
  { icon: Scissors, label: "Haircuts", path: "/services" },
  { icon: Sparkles, label: "Makeup", path: "/services" },
  { icon: Star, label: "Bridal", path: "/services" },
  { icon: Store, label: "Near Me", path: "/services" },
];

const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();

  if (collapsed) {
    return (
      <aside className="fixed left-0 top-14 z-40 flex h-[calc(100vh-56px)] w-[72px] flex-col items-center gap-1 overflow-y-auto bg-background py-2 scrollbar-hide">
        {mainLinks.map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className={`flex w-full flex-col items-center gap-1 rounded-lg px-1 py-3 text-[10px] transition-colors hover:bg-secondary ${
              location.pathname === path ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-14 z-40 flex h-[calc(100vh-56px)] w-60 flex-col overflow-y-auto bg-background px-3 py-2 scrollbar-hide">
      {/* Main */}
      <div className="border-b border-border pb-3">
        {mainLinks.map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className={`flex items-center gap-4 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary ${
              location.pathname === path
                ? "bg-secondary font-medium text-primary"
                : "text-foreground"
            }`}
          >
            <Icon className={`h-5 w-5 flex-shrink-0 ${location.pathname === path ? "text-primary" : ""}`} />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Personal */}
      <div className="border-b border-border py-3">
        <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">You</h3>
        {personalLinks.map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center gap-4 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary"
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Following Salons */}
      <div className="border-b border-border py-3">
        <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Following</h3>
        {salonList.slice(0, 5).map((salon) => (
          <Link
            key={salon.id}
            to={`/salon/${salon.id}`}
            className="flex items-center gap-4 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary"
          >
            <img src={salon.avatar} alt={salon.name} className="h-6 w-6 flex-shrink-0 rounded-full object-cover" />
            <span className="line-clamp-1">{salon.name}</span>
          </Link>
        ))}
        <button className="flex items-center gap-4 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary">
          <ChevronDown className="h-5 w-5 flex-shrink-0" />
          <span>Show more</span>
        </button>
      </div>

      {/* Explore */}
      <div className="py-3">
        <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore</h3>
        {exploreLinks.map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center gap-4 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary"
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-4 px-3 pb-6 text-xs text-muted-foreground">
        <p className="font-display gold-gradient-text text-sm">Zarkobit</p>
        <p className="mt-1">Your Premium Salon Experience</p>
        <p className="mt-1">© 2025 Zarkobit. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
