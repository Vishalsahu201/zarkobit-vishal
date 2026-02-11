import {
  Home, Flame, Library, Clock, ThumbsUp,
  PlaySquare, ChevronDown, Music2, Gamepad2,
  Newspaper, Trophy, Lightbulb, Radio
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { subscriptions } from "@/data/mockData";

interface SidebarProps {
  collapsed: boolean;
}

const mainLinks = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Flame, label: "Trending", path: "/trending" },
  { icon: PlaySquare, label: "Subscriptions", path: "/subscriptions" },
  { icon: Library, label: "Library", path: "/library" },
];

const libraryLinks = [
  { icon: Clock, label: "History", path: "/library" },
  { icon: PlaySquare, label: "Your videos", path: "/library" },
  { icon: ThumbsUp, label: "Liked videos", path: "/library" },
];

const exploreLinks = [
  { icon: Flame, label: "Trending", path: "/trending" },
  { icon: Music2, label: "Music", path: "/trending" },
  { icon: Gamepad2, label: "Gaming", path: "/trending" },
  { icon: Newspaper, label: "News", path: "/trending" },
  { icon: Trophy, label: "Sports", path: "/trending" },
  { icon: Lightbulb, label: "Learning", path: "/trending" },
  { icon: Radio, label: "Live", path: "/trending" },
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
            className={`flex w-full flex-col items-center gap-1 rounded-lg px-1 py-3 text-[10px] hover:bg-secondary ${
              location.pathname === path ? "text-foreground" : "text-muted-foreground"
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
            className={`flex items-center gap-5 rounded-lg px-3 py-2 text-sm hover:bg-secondary ${
              location.pathname === path
                ? "bg-secondary font-medium text-foreground"
                : "text-foreground"
            }`}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Library */}
      <div className="border-b border-border py-3">
        <h3 className="mb-1 px-3 text-sm font-medium text-foreground">Library</h3>
        {libraryLinks.map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center gap-5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary"
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Subscriptions */}
      <div className="border-b border-border py-3">
        <h3 className="mb-1 px-3 text-sm font-medium text-foreground">Subscriptions</h3>
        {subscriptions.slice(0, 5).map((channel) => (
          <Link
            key={channel.id}
            to={`/channel/${channel.id}`}
            className="flex items-center gap-5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary"
          >
            <img
              src={channel.avatar}
              alt={channel.name}
              className="h-6 w-6 flex-shrink-0 rounded-full object-cover"
            />
            <span className="line-clamp-1">{channel.name}</span>
          </Link>
        ))}
        <button className="flex items-center gap-5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary">
          <ChevronDown className="h-5 w-5 flex-shrink-0" />
          <span>Show more</span>
        </button>
      </div>

      {/* Explore */}
      <div className="py-3">
        <h3 className="mb-1 px-3 text-sm font-medium text-foreground">Explore</h3>
        {exploreLinks.map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center gap-5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary"
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-4 px-3 pb-6 text-xs text-muted-foreground">
        <p>© 2025 VidTube</p>
        <p className="mt-1">Terms · Privacy · Policy & Safety</p>
      </div>
    </aside>
  );
};

export default Sidebar;
