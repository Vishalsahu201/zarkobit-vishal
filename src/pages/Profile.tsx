import { User, Settings, Heart, Clock, Star, CalendarCheck, MapPin, ChevronRight, LogOut } from "lucide-react";

const profileStats = [
  { label: "Bookings", value: "24", icon: CalendarCheck },
  { label: "Reviews", value: "12", icon: Star },
  { label: "Favorites", value: "38", icon: Heart },
];

const menuItems = [
  { icon: CalendarCheck, label: "My Bookings", desc: "View upcoming & past appointments" },
  { icon: Heart, label: "Favorite Salons", desc: "Saved salons & services" },
  { icon: Clock, label: "Booking History", desc: "See all your past visits" },
  { icon: Star, label: "My Reviews", desc: "Reviews you've written" },
  { icon: MapPin, label: "Saved Addresses", desc: "Manage your locations" },
  { icon: Settings, label: "Account Settings", desc: "Edit profile, password & more" },
];

const Profile = () => {
  return (
    <div className="px-6 py-6">
      {/* Profile Header */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-surface-elevated to-primary/10 p-6 gold-border">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary gold-glow">
              <User className="h-12 w-12 text-primary-foreground" />
            </div>
            <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-card border border-border text-xs">
              ✏️
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="font-display text-2xl font-bold text-foreground">Priya Sharma</h1>
            <p className="text-sm text-muted-foreground">priya.sharma@email.com</p>
            <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground sm:justify-start">
              <MapPin className="h-3 w-3" /> Mumbai, Maharashtra
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">Premium Member</span>
              <span className="rounded-full bg-chip px-3 py-1 text-xs text-chip-foreground">Since 2024</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {profileStats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl bg-card/50 p-3 text-center backdrop-blur-sm">
              <Icon className="mx-auto h-5 w-5 text-primary mb-1" />
              <p className="text-xl font-bold font-display text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-6 space-y-2">
        {menuItems.map(({ icon: Icon, label, desc }) => (
          <button
            key={label}
            className="flex w-full items-center gap-4 rounded-xl bg-card p-4 text-left transition-colors hover:bg-surface-hover card-shine"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 p-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
        <LogOut className="h-4 w-4" /> Sign Out
      </button>
    </div>
  );
};

export default Profile;
