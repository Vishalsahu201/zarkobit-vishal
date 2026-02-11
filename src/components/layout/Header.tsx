import { useState } from "react";
import { Search, Menu, Bell, User, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/95 backdrop-blur-md px-4">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="rounded-full p-2 hover:bg-secondary">
          <Menu className="h-5 w-5 text-foreground" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary gold-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold gold-gradient-text tracking-wide">Zarkobit</span>
        </Link>
      </div>

      {/* Center - Search */}
      <form onSubmit={handleSearch} className="mx-4 hidden w-full max-w-xl md:flex">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search salon services, styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-l-full border border-border bg-surface px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-r-full border border-l-0 border-border bg-secondary px-5 hover:bg-surface-hover"
          >
            <Search className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </form>

      {/* Right */}
      <div className="flex items-center gap-1">
        <button className="rounded-full p-2 hover:bg-secondary md:hidden">
          <Search className="h-5 w-5 text-foreground" />
        </button>
        <button className="relative rounded-full p-2 hover:bg-secondary">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            5
          </span>
        </button>
        <Link to="/profile" className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary gold-glow">
          <User className="h-4 w-4 text-primary-foreground" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
