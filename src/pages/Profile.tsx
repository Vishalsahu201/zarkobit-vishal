import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Settings, Heart, Clock, Star, CalendarCheck, MapPin, ChevronRight, LogOut, Crown } from "lucide-react";

const profileStats = [
  { label: "Bookings", value: "24", icon: CalendarCheck },
  { label: "Reviews", value: "12", icon: Star },
  { label: "Favorites", value: "38", icon: Heart },
];

const menuItems = [
  { icon: CalendarCheck, label: "My Bookings", desc: "View upcoming & past appointments", path: "/my-bookings" },
  { icon: Heart, label: "Favorite Salons", desc: "Saved salons & services", path: "/favorite-salons" },
  { icon: Clock, label: "Booking History", desc: "See all your past visits", path: "/booking-history" },
  { icon: Star, label: "My Reviews", desc: "Reviews you've written", path: "/my-reviews" },
  { icon: MapPin, label: "Saved Addresses", desc: "Manage your locations", path: "/saved-addresses" },
  { icon: Settings, label: "Account Settings", desc: "Edit profile, password & more", path: "/account-settings" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const displayName = user?.user_metadata?.full_name || "Guest User";
  const email = user?.email || "Not signed in";

  return (
    <div className="px-4 py-6 sm:px-6">
      {/* Profile Header */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-surface-elevated to-primary/10 p-6 gold-border">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-primary gold-glow">
              <User className="h-10 w-10 sm:h-12 sm:w-12 text-primary-foreground" />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground">{displayName}</h1>
            <p className="text-sm text-muted-foreground">{email}</p>
            {!user && (
              <button onClick={() => navigate("/auth")} className="mt-2 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground">
                Sign In / Sign Up
              </button>
            )}
            {user && (
              <div className="mt-2 flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary flex items-center gap-1"><Crown className="h-3 w-3" /> Premium</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {profileStats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl bg-card/50 p-3 text-center backdrop-blur-sm">
              <Icon className="mx-auto h-4 w-4 sm:h-5 sm:w-5 text-primary mb-1" />
              <p className="text-lg sm:text-xl font-bold font-display text-foreground">{value}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-6 space-y-2">
        {menuItems.map(({ icon: Icon, label, desc, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="flex w-full items-center gap-3 sm:gap-4 rounded-xl bg-card p-3 sm:p-4 text-left transition-colors hover:bg-surface-hover"
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      {user && (
        <button onClick={handleLogout} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 p-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      )}
    </div>
  );
};

export default Profile;
